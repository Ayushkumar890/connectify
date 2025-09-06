// src/socket.js
import { io } from "socket.io-client";

export const socket = io("https://connectify-93bj.onrender.com", {
  withCredentials: true,
  autoConnect: false, 
}); 