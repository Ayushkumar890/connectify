// src/socket.js
import { io } from "socket.io-client";
import BackendURL from "./api/auth";

export const socket = io(`${BackendURL}`, {
  withCredentials: true,
  autoConnect: false, 
}); 