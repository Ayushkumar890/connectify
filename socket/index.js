// socket/index.js
const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://connectify-saas.vercel.app", // your React client
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  // Track online users as a Map<userId, countOfSockets>
  const onlineCounts = new Map();

  const broadcastOnlineUsers = () => {
    // Just share userIds; expand structure if you need more fields
    const users = Array.from(onlineCounts.keys()).map((userId) => ({ userId }));
    io.emit("get-users", users);
  };

  io.on("connection", (socket) => {
    // console.log(`✅ New socket connected: ${socket.id}`);

    // Client should call this once after it knows the userId
    socket.on("new-user-add", (userId) => {
      if (!userId) return;
      socket.data.userId = userId;

      // Join a room named by the userId so ALL that user's sockets get messages
      socket.join(userId);

      // Maintain online counts
      const prev = onlineCounts.get(userId) || 0;
      onlineCounts.set(userId, prev + 1);

      // console.log("👥 Online counts:", Object.fromEntries(onlineCounts));
      broadcastOnlineUsers();
    });

    // One-to-one message: deliver to receiver's room (all their sockets)
    socket.on("send-message", (data) => {
      // expected: { chatId, senderId, receiverId, text, createdAt? }
      if (!data || !data.receiverId) return;
      const payload = {
        ...data,
        createdAt: data.createdAt || new Date(),
      };

      // Send to receiver (all their devices/tabs)
      io.to(data.receiverId).emit("receive-message", payload);

      // Echo back to sender's current socket so they also "receive" it via the same path
      socket.emit("receive-message", payload);

      // (Optional) If you want ALL of sender's sockets to get it too:
      // io.to(data.senderId).emit("receive-message", payload);
    });

    // Join/emit for community groups (rooms)
    socket.on("joinCommunityGroup", ({ communityId }) => {
      if (!communityId) return;
      socket.join(communityId);
      console.log(`🏘️ ${socket.id} joined community room ${communityId}`);
    });

    socket.on("sendGroupMessage", (messageData) => {
      // expected: { communityId, senderId, text }
      const { communityId, senderId, text } = messageData || {};
      if (!communityId || !senderId || !text) return;

      const payload = {
        communityId,
        senderId,
        text,
        createdAt: new Date(),
      };

      io.to(communityId).emit("receiveGroupMessage", payload);
    });

    // Cleanup on disconnect
    socket.on("disconnect", () => {
      const userId = socket.data.userId;
      if (userId) {
        const prev = onlineCounts.get(userId) || 1;
        const next = prev - 1;
        if (next <= 0) onlineCounts.delete(userId);
        else onlineCounts.set(userId, next);
      }
      console.log(`❌ Socket disconnected: ${socket.id}`);
      broadcastOnlineUsers();
    });
  });

  return io; // <-- important so server can attach req.io
}

module.exports = initializeSocket;