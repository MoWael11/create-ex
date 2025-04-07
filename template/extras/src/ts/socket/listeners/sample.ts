import { Socket } from 'socket.io';

export const registerSampleListeners = (socket: Socket) => {
  const emitMessage = (event: string, message: string) => {
    socket.broadcast.emit(event, message);
  };

  socket.on('sample', (message: string) => emitMessage('message', message));

  socket.on('sample:update', (message: string) => emitMessage('sample:update', message));

  socket.on('sample:delete', (message: string) => emitMessage('sample:delete', message));
};
