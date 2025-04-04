const handleUserConnection = async (socket) => {
  console.log(`User connected: ${socket.id}`);
};

const handleUserDisconnection = async (socket) => {
  console.log(`User disconnected: ${socket.id}`);
};

module.exports = { handleUserConnection, handleUserDisconnection };
