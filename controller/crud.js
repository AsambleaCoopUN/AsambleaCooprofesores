const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    const asamblea = req.body.asamblea;
    const cedula = req.body.cedula;
    /* prueba de captura los datos */
/*     console.log(cedula + " - " + credencia); */
try {
    // Ejecutar la consulta SQL
    const [rows, fields] = await conexion.execute(`INSERT INTO emodel.asistencia_asamblea (asamblea_id, delegado_id) SELECT a.id, d.id FROM emodel.asamblea a JOIN emodel.delegado d ON a.fecha = d.asamblea_fecha WHERE d.delegado_documento_identificacion = ?`, [cedula]);
    console.log(`Se insertaron ${rows.affectedRows} filas.`);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
    } finally {
            // Cerrar la conexión a la base de datos
            await connection.end();
    }
}
    



conexion.query('INSERT INTO emodel.asistencia_asamblea (asamblea_id, delegado_id) SELECT a.id, d.id FROM emodel.asamblea a JOIN emodel.delegado d ON a.fecha = d.asamblea_fecha WHERE d.delegado_documento_identificacion = ?', [cedula], (error, results)=>{
        if (error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    });
}