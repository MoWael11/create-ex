const registerSampleListeners = (socket) => {
  const emitSample = (event, message) => {
    socket.broadcast.emit(event, message);
  };

  socket.on('sample', (message) => emitSample('message', message));

  socket.on('sample:update', (message) => emitSample('sample:update', message));

  socket.on('sample:delete', (message) => emitSample('sample:delete', message));
};

module.exports = { registerSampleListeners };
