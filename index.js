/* creación de constantes para la invocación del servidor */
const { json } = require("express");
const express = require("express");
const app = express();

/* definición de ruta y puerto del servidor de pruebas */
app.listen(8688, ()=>{
    console.log('Server corriendo en http://localhost:8688')
});

/* Establecer la carpeta pública */
app.use(express.static('public'));

/* establecer las carpetas estáticas */
app.use(express.static(__dirname + '/node_modules/bootstrap/dist' + '/node_modules/jquery/dist/' + '/public/'));

/* indicación para la captura de datos con metodo post */
app.use(express.urlencoded({extended:false}));
app.use(express(json));

/* EJS como motor de plantillas*/
app.set('view engine','ejs');

/* llamado del enrrutador */
app.use('/', require('./router'));