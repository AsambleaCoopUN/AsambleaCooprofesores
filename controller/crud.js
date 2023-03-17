const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    /* capturas las celdas requeridas por el id */
    const asambleaId = (req.body.asambleaId);
    const delegadoId = (req.body.delegadoId);

    /* prueba de captura los datos */
    /* console.log(asambleaId + " - " + delegadoId); */

    conexion.query (`INSERT INTO emodel.asistencia_asamblea (asamblea_id, delegado_id) VALUES ('${asambleaId}','${delegadoId}')`, (error, results) => {
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
    const search = `SELECT a.asamblea_id, d.delegado_id ,d.delegado_documento_identificacion , d.delegado_nombres , d.delegado_tipo FROM emodel.asamblea a, emodel.delegado d WHERE d.delegado_documento_identificacion = '${cedula}'`;
    conexion.query(search, (error, results) =>{
        if (error){
            throw error;
        }else{
            res.render('consulta', {results:results.rows});
        }
    });
}