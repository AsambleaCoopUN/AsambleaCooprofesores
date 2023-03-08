/* creación de constantes para la invocación del servidor */
const express = require("express");
const app = express();

/* definición de ruta y puerto del servidor de pruebas */
app.listen(8688, ()=>{
    console.log('Server corriendo en http://localhost:8688')
});

/* Establecer la carpeta pública */
app.use(express.static('public'));

/* EJS como motor de plantillas*/
app.set('view engine','ejs');

/* llamado del enrrutador */
app.use('/', require('./router'));