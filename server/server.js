// server/server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const initializeSocket = require("./socket");

const app = express();
const server = http.createServer(app);

// ✅ Initialize socket.io with the HTTP server
const io = initializeSocket(server);

// If you want io inside routes later, attach it to req
app.use((req, res, next) => {
    req.io = io;
    next();
});

const _dirname = path.resolve();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

app.use(cors({
    origin: [
        "https://connectify-93bj.onrender.com",
        "https://connectify-saas.vercel.app"
    ],
    credentials: true
}));

// Connect DB
require("./config/database").connect();

// Routes
app.use("/api/auth", require("./routes/user"));
app.use("/chat", require("./routes/chat"));
app.use("/message", require("./routes/message"));
app.use("/community", require("./routes/community"));

// Serve React build
app.use(express.static(path.join(_dirname, "/client/build")));

app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});