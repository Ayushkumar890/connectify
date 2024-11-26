const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(8800, {
    cors: {
      origin: "http://localhost:3001",
    },
  });

  let activeUsers = [];

  io.on("connection", (socket) => {
    console.log(`New user connected: ${socket.id}`);

    // Event: Add a new user
    socket.on("new-user-add", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
      }
      console.log("Active Users: ", activeUsers);
      io.emit("get-users", activeUsers);
    });

    // Event: Send a message
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
      console.log(`User disconnected: ${socket.id}`);
      io.emit("get-users", activeUsers);
    });
  });
}

module.exports = initializeSocket;
