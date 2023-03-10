const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    const cedula = req.body.cedula;
    const credencia = req.body.credencial;
    /* prueba de captura los datos */
    console.log(cedula + " - " + credencia);
    /* conexion.query('insert into emodel.pregunta_asamblea(pregunta_enunciado, bandera_votacion, asamblea_id) SET ?',{pregunta:pregunta, pregunta:'E', pregunta:'1'}, (error, results)=>{
        if (error){
            console.log(error);
        }else{

            res.redirect('/');
        }
    }); */
}