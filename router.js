const express = require ('express');
const router = express.Router();
const conexion = require('./database/conexion');

router.get('/',(req,res)=> {
    res.render('index');
       /*  conexion.query('SELECT * FROM emodel.delegado', (error,results)=>{
        if (error){
            throw error;
        }else{
            res.send(results);
        }
    }); */
})

/* redirecciona a la pagina donde aparece el listado completo de delegados y lo ordena por fecha y hora de registro de ingreso a la Asamblea*/
router.get('/general', (req, res) => {
    const lgeneral = 'select d.delegado_id ,d.delegado_documento_identificacion , d.delegado_nombres , d.delegado_tipo ,aa.fecha_hora_registro_entrada from emodel.delegado d left outer join emodel.asistencia_asamblea aa on d.delegado_id  = aa.delegado_id order by aa.fecha_hora_registro_entrada  asc';
    conexion.query(lgeneral , (error,results)=>{
        if (error){
            throw error;
        }else{
            res.render('general', {results:results.rows});
        }
    });
})

router.get('/create', (req,res)=>{
    res.render('create');
})

router.get('/consulta', (req,res)=>{
    res.render('consulta');
})


const crud = require ('./controller/crud');
router.post('/save', crud.save);
router.post('/read', crud.read);
//router.post('/pregunta', crud.pregunta);

//enrutamiento para visualizar todas las preguntas 
router.get('/view_questions', (req, res) => {
    const lViewAll = `select pregunta_id, orden_pregunta, pregunta_enunciado,case bandera_votacion when 'E' then 'En espera de votación' when 'C' then 'Pregunta Votada' when 'A' then 'Pregunta en proceso de votación' end estado_pregunta from emodel.pregunta_asamblea pa order by pregunta_id`;

    conexion.query(lViewAll , (error,results)=>{
        if (error){
            throw error;
        } else {            
            res.render('view_questions', {results:results.rows});
        }
    });
});

//enrutamiento para visualizar solo una pregunta preguntas 
router.get('/view_Selec_question', (req, res) => {
    const idPregunta = (req.body.pregunta_id);
    const TexPregunta = `SELECT pa.pregunta_id, pa.orden_pregunta, pa.pregunta_enunciado FROM emodel.pregunta_asamblea pa WHERE pa.pregunta_id = '${idPregunta}'`; 
        
    conexion.query(TexPregunta, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('view_Selec_question', {results: results.rows});
        }
    });
    res.render('view_Selec_question');
});

module.exports = router;
