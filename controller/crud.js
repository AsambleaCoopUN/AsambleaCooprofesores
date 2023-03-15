const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    const asamblea = req.body.asamblea;
    const idUsuario = req.body.idUsuario;
    /* prueba de captura los datos */
/*     console.log(cedula + " - " + credencia); */
conexion.query ('INSERT INTO emodel.asistencia_asamblea (asamblea_id, delegado_id SET ?', {asamblea:asamblea, idUsuario:idUsuario}, (error, results) =>{
    if (error){
        throw error;
    }else{
        res.redirect('/');
    }
});
}

exports.read = (req,res)=>{
    /* prueba de captura los datos */
    const cedula = (req.body.cedula);
    conexion.query(`SELECT a.asamblea_id, d.delegado_id ,d.delegado_documento_identificacion , d.delegado_nombres , d.delegado_tipo FROM emodel.asamblea a, emodel.delegado d WHERE d.delegado_documento_identificacion = '${cedula}'`, (error, results) =>{
        if (error){
            throw error;
        }else{
            res.render('consulta', {results:results.rows});
        }
    });
}