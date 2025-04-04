import corsOptions from '@/config/cors-options';
import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { handleUserConnection, handleUserDisconnection } from './handlers';
import { registerSampleListeners } from './listeners/sample';

export let io: Server;

export const initializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: corsOptions,
  });

  io.on('connection', (socket) => {
    handleUserConnection(socket);

    // register listeners
    registerSampleListeners(socket);

    socket.on('disconnect', () => {
      handleUserDisconnection(socket);
    });
  });
};
