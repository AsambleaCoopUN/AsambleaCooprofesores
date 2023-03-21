const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    /* capturas las celdas requeridas por el id */
    const asambleaId = (req.body.asambleaId);
    const delegadoId = (req.body.delegadoId);
    const insert = `INSERT INTO emodel.asistencia_asamblea (asamblea_id, delegado_id) VALUES ('${asambleaId}','${delegadoId}')`;
    /* prueba de captura los datos */
    /* console.log(asambleaId + " - " + delegadoId); */

    /* Query de inserción a la base de datos de los campos "asamblea_id" y "delegado_id"*/
    conexion.query (insert, (error, results) => {
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
    
    /* Query de búsqueda a la base de datos por el número de cedula*/
    conexion.query(search, (error, results) =>{
        if (error){
            throw error;
        }else{
            res.render('consulta', {results:results.rows});
        }
    });
}

exports.pregunta = (req, res) => {
    /* Query de búsqueda una pregunta expecifica por ID y envia el enunciado y el # de la pregunta*/
    const idPregunta = (req.body.pregunta_id);
    
    const TexPregunta = `SELECT pa.pregunta_id, pa.orden_pregunta, pa.pregunta_enunciado FROM emodel.pregunta_asamblea pa WHERE pa.pregunta_id = '${idPregunta}'`;

    const expecificQuestion = `SELECT po.pregunta_opcion_orden ,po.pregunta_opcion_enunciado,crpm.votos_opcion, votos_validos ,minimo_valor_triunfo , pa.tipo_pregunta from emodel.calcula_resultado_pregunta_mayoria crpm inner join emodel.pregunta_opciones po on po.pregunta_opcion_id = crpm.opcion_id and  po.pregunta_id =crpm.pregunta_id inner join emodel.pregunta_asamblea pa on pa.pregunta_id = crpm.pregunta_id WHERE crpm.pregunta_id = '${idPregunta}'`;
    
    conexion.query(TexPregunta, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('view_Selec_question', {results: results.rows});
        }
    });
}