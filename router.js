const express = require('express');
const router = express.Router();
const conexion = require('./database/conexion');

/* agregar middleware para capturar la información del dispositivo */
const useragent = require('express-useragent');
const device = require('device');
router.use(useragent.express());

const isLoggedIn = require("./public/middlewares/isLoggedIn");

/* enrutamiento a la página principal */
router.get('/', isLoggedIn,(req,res)=> {
  res.render('index');
});

router.get('/login',(req,res)=> {
    res.render('login');
  });

router.get('/test', (req, res) => {
    res.render('test');
});

/* enrutamiento hacia la página de creación de preguntas */
router.get('/create',(req,res)=> {
    res.render('create');
})

/* enrutamiento hacia la página de edición de preguntas */
router.get('/edit',(req,res)=> {
    res.render('edit');
})

/* enrutamiento a la pagina donde aparece el listado completo de delegados y lo ordena por fecha y hora de registro de ingreso a la Asamblea*/
router.get('/general', (req, res) => {
    const lgeneral = `select d.delegado_id, d.delegado_codigo_alterno, d.delegado_documento_identificacion , d.delegado_nombres, d.delegado_tipo ,aa.fecha_hora_registro_entrada from emodel.delegado d left outer join emodel.asistencia_asamblea aa on d.delegado_id  = aa.delegado_id where d.delegado_id >=130 order by aa.fecha_hora_registro_entrada  asc`;
    conexion.query(lgeneral , (error,results)=>{
         if (error){
            throw error;
        }else{
            res.render('general', {results:results.rows});
        }
    });
})

/* enrutamiento a la vista de la pregunta del couciente */
router.get('/view_cociente', (req,res)=>{
    res.render('view_cociente');
})

/* enrutamiento para visualizar si el usuario existe como delegado o suplente  */
router.get('/consulta', (req,res)=>{
    res.render('consulta');
})

/* enrutamiento para visualizar el control de ingreso y salida de sala  */
router.get('/checkInOut', (req,res)=>{
    res.render('checkInOut');
})

/* métodos almacenados en crud */
const crud = require ('./controller/crud');
router.post('/save', crud.save);
router.post('/pregunta', crud.pregunta);
router.post('/salaInOut', crud.salaInOut);
router.post('/registroVoto', crud.registroVoto);


/* métodos almacenados en search*/
const search = require ('./controller/search');
router.post('/read', search.read);
router.get('/votacion', search.votacion);
router.get('/paVotar', search.paVotar);

/* enrutamiento para visualizar todas las preguntas  */
router.get('/view_questions', (req, res) => {
    const lViewAll = `select pregunta_id, orden_pregunta, pregunta_enunciado, tipo_pregunta, case bandera_votacion when 'E' then 'En espera de votación' when 'C' then 'Pregunta Votada' when 'A' then 'Pregunta en proceso de votación' end estado_pregunta from emodel.pregunta_asamblea pa order by orden_pregunta`;

    conexion.query(lViewAll , (error,results)=>{
        if (error){
            throw error;
        } else {
            res.render('view_questions', { results: results.rows });
        }
    });
});


/* enrutamiento para visualizar los delegados presentes en la asamblea para validar el Quorum */
router.get('/estadoEnSala', (req, res) => {
    const courum = `select d.delegado_codigo_alterno codigo_asamblea ,d.delegado_documento_identificacion , d.delegado_nombres , d.delegado_tipo ,
    case aa.asistente_activo 
    when true then 'EN SALA' 
    when false then 'FUERA DE SALA' 
    end estado from emodel.asistencia_asamblea aa 
    inner join emodel.delegado d 
    on d.delegado_id = aa.delegado_id 
    where asamblea_id = 6 and d.delegado_tipo <> 'AGREGADOR_PRINCIPAL'
    order by aa.asistente_activo desc, d.delegado_tipo asc`;

    conexion.query(courum , (error,results)=>{
        if (error){
            throw error;
        } else {
            res.render('estadoEnSala', { results: results.rows });
        }
    });
})


module.exports = router;
