const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    const asamblea = req.body.asamblea;
    const cedula = req.body.cedula;
    /* prueba de captura los datos */
/*     console.log(cedula + " - " + credencia); */
    conexion.query('INSERT INTO emodel.asistencia_asamblea (asamblea_id,delegado_id) SET ?', {asamblea:asamblea, cedula:cedula}, (error, results)=>{
        if (error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
}