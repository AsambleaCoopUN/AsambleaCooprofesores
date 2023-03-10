const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    const pregunta = req.body.pregunta;
    const respuesta1 = req.body.respuesta1;
    const respuesta2   = req.body.respuesta2;
    const respuesta3 = req.body.respuesta3;
    /* prueba de captura los datos */
    /* console.log(pregunta + " - " + respuesta1 + " - " + respuesta2 + " - " + respuesta3); */
    conexion.query('insert into emodel.pregunta_asamblea(pregunta_enunciado, bandera_votacion, asamblea_id) SET ?',{pregunta:pregunta, pregunta:'E', pregunta:'1'}, (error, results)=>{
        if (error){
            console.log(error);
        }else{

            res.redirect('/');
        }
    });
    
    conexion.query('insert into emodel.pregunta_opciones (pregunta_opcion_orden,pregunta_opcion_enunciado,pregunta_opcion_ordinal, pregunta_opcion_visualizar ,pregunta_id) SET ?',{respuesta1:'1', respuesta1:respuesta1, respuesta1:'a', respuesta1:'S', respuesta1:'2'}, (error, results)=>{
        if (error){
            console.log(error);
        }else{

            res.redirect('/');
        }
    });
}