module.exports = httpServer=>{
  const {Server} = require("socket.io");
  const io = new Server(httpServer);
  io.on("connection", socket=>{
    console.log("El agente del Socket es: ",socket.id);
  });
}