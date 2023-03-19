const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    //* Captura las celdas requeridas por el id */
    const asambleaId = req.body.asambleaId;
    const delegadoId = req.body.delegadoId;

    /* Query de que inserta los en la tabla asistencia_asamblea los datos recibidos*/
    const insert = `INSERT INTO emodel.asistencia_asamblea (asamblea_id, delegado_id) VALUES ('${asambleaId}','${delegadoId}')`;

    /* Query de búsqueda los registros recibidos*/
    const validate = `SELECT aa.asamblea_id, aa.delegado_id, aa.fecha_hora_registro_entrada FROM emodel.asistencia_asamblea aa WHERE asamblea_id = '${asambleaId}' AND delegado_id = '${delegadoId}' AND fecha_hora_registro_entrada IS NOT NULL`;
    
    try{
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
    }catch(error ){
        console.log(error.name, error.message);
    }
    console.log("la cago");
    res.render('/');
    /* Query de inserción a la base de datos de los campos "asamblea_id" y "delegado_id"*/
    /* conexion.query (insert, (error, results) => {
        if (error){
            throw error;
        }else{
            res.redirect('/');
        }
    }); */
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