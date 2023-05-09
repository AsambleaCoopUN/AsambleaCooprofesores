/* creación de constantes para la invocación del servidor */
const express = require("express");
const app = express();

const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);

/* definición de ruta y puerto del servidor de pruebas */
server.listen(8688, ()=>{
    console.log('Server corriendo en http://localhost:8688')
});

/* Establecer la carpeta pública */
app.use(express.static('public'));


// IO = se conencta con backend
let io = socketIO(server);

/* establecer las carpetas estáticas */
app.use(express.static(__dirname + '/node_modules/bootstrap/'));
app.use(express.static(__dirname + '/node_modules/jquery/'));
app.use(express.static(__dirname + '/public/'));

/* indicación para la captura de datos con método post */
const { json } = require("express");
app.use(express.urlencoded({extended:false}));
app.use(express.json());

/* EJS como motor de plantillas*/
app.set('view engine','ejs');

/* llamado del enrrutador */
app.use('/', require('./router'));

/* Configuración de Socket.IO*/
io.on('connection', socket => {
  //console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    //console.log('Cliente desconectado');
  });
});  
