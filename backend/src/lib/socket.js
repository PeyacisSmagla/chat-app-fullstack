import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const onlineUsers = new Set();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    socket.join(userId);
    onlineUsers.add(userId);
    console.log(`User ${userId} joined room`);
  }

  io.emit("getOnlineUsers", Array.from(onlineUsers));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId) {
      onlineUsers.delete(userId);
    }
    io.emit("getOnlineUsers", Array.from(onlineUsers));
  });
});

export { io, app, server };
