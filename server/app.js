require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const { FrontendURL, BackendURL } = require("./config/index");

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

const allowedOrigins = [
  FrontendURL,
  BackendURL,
  "http://localhost:3000",
  "http://localhost:8000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// DB connect
require("./config/database").connect();

// Routes
app.use("/api/auth", require("./routes/user"));
app.use("/chat", require("./routes/chat"));
app.use("/message", require("./routes/message"));
app.use("/community", require("./routes/community"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

module.exports = app;