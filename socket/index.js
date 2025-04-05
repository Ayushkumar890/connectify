const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(8800, {
    cors: {
      origin: "https://connectify-93bj.onrender.com",
    },
  });

  let activeUsers = [];

  io.on("connection", (socket) => {
    // console.log(`New user connected: ${socket.id}`);

    // Event: Add a new user
    socket.on("new-user-add", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
      }
      // console.log("Active Users: ", activeUsers);
      io.emit("get-users", activeUsers);
    });

    // Event: User joins a community group (room)
    socket.on("joinCommunityGroup", ({ communityId }) => {
      socket.join(communityId); // Join the room for group chat
      // console.log(`User ${socket.id} joined community ${communityId}`);
    });

    // Event: Send a message (group chat)
    socket.on("sendGroupMessage", (messageData) => {
      const { communityId, senderId, text } = messageData;
      // Broadcast the message to all users in the room (community group)
      io.to(communityId).emit("receiveGroupMessage", {
        senderId,
        text,
        createdAt: new Date(),
      });
    });

    // Event: Send a message (one-to-one chat)
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
        io.to(user.socketId).emit("receive-message", data);
      }
    });

    // Event: Disconnect
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      // console.log(`User disconnected: ${socket.id}`);
      io.emit("get-users", activeUsers);
    });
  });
}

module.exports = initializeSocket;
