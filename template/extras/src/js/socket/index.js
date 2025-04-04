const corsOptions = require('@/config/cors-options');
const { Server } = require('socket.io');
const { handleUserConnection, handleUserDisconnection } = require('./handlers');
const { registerSampleListeners } = require('./listeners/sample');

let io;

const initializeSocket = (server) => {
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

module.exports = { io, initializeSocket };
