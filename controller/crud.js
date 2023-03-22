const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    //* Captura las celdas requeridas por el id */
    const asambleaId = req.body.asambleaId;
    const delegadoId = req.body.delegadoId;

    /* Query de que inserta los en la tabla asistencia_asamblea los datos recibidos*/
    const insert = `INSERT INTO emodel.asistencia_asamblea (asamblea_id, delegado_id) VALUES ('${asambleaId}','${delegadoId}')`;

    /* Query de búsqueda los registros recibidos*/
    const validate = `SELECT aa.asamblea_id, aa.delegado_id, aa.fecha_hora_registro_entrada FROM emodel.asistencia_asamblea aa WHERE delegado_id = '${delegadoId}'`;
    /* console.log(validate)
    conexion.query(validate, (error, results) => {
      if (error) {
          throw error;
      }else{
        const fecha = validate.rows.fecha_hora_registro_entrada;
        res.redirect('/');
      }
      });
    
    console.log(fecha) */
    /* if (fecha===NULL){
        try {
            conexion.query(validate, (error, results) => {
                if (error) {
                    throw error;
                } else if (results.length === 0) {
                    conexion.query(insert, (error, results) => {
                        if (error) {
                            throw error;
                        } else {
                            res.send("Registro Satisfactorio");
                        }
                    });
                } else {
                    res.send("Usuario ya registrado");
                }
            });
        } catch (error) {
        console.log(error.name, error.message);
    }
    }else{
        console.log('la cago');
        res.redirect('/');
    } */
    
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
    /* se asigna la cédula recibida a una constante */
    const cedula = (req.body.cedula);
    /* Query de búsqueda a la base de datos por el número de cedula*/
    const search = `SELECT a.asamblea_id, d.delegado_id ,d.delegado_documento_identificacion , d.delegado_nombres , d.delegado_tipo FROM emodel.asamblea a, emodel.delegado d WHERE d.delegado_documento_identificacion = '${cedula}'`;
    
    /* método que ejecuta el query y devuelve el resultado o el error obtenidos */
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
    
    //const TexPregunta = `SELECT pa.pregunta_id, pa.orden_pregunta, pa.pregunta_enunciado FROM emodel.pregunta_asamblea pa WHERE pa.pregunta_id = '${idPregunta}'`;

    const TexPregunta = `SELECT pa.pregunta_id, pa.orden_pregunta, pa.pregunta_enunciado, po.pregunta_opcion_ordinal || po.pregunta_opcion_enunciado AS opcion_enunciado, crpm.votos_opcion FROM emodel.pregunta_asamblea pa INNER JOIN emodel.pregunta_opciones po ON pa.pregunta_id = po.pregunta_id LEFT OUTER JOIN emodel.calcula_resultado_pregunta_mayoria crpm ON crpm.opcion_id = po.pregunta_opcion_id WHERE pa.pregunta_id = '${idPregunta}' ORDER BY po.pregunta_id, po.pregunta_opcion_orden;`;
    
    conexion.query(TexPregunta, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('view_Selec_question', {results: results.rows});
        }
    });
}


exports.salaInOut = (req,res) => {
  const cedula = (req.body.cedula);
  
}