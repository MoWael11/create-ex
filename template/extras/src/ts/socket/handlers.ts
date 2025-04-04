import { Socket } from 'socket.io';

export const handleUserConnection = async (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
};

export const handleUserDisconnection = async (socket: Socket) => {
  console.log(`User disconnected: ${socket.id}`);
};
