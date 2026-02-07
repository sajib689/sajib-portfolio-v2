import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

export default function SocketHandler(req: NextApiRequest, res: any) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected", socket.id);

      socket.on("visitor-update", (data) => {
        // Broadcast to admin dashboard
        io.emit("admin-visitor-update", { ...data, socketId: socket.id });
      });

      socket.on("join-room", (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-joined", socket.id);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
        io.emit("visitor-disconnected", socket.id);
      });
    });
  }
  res.end();
}
