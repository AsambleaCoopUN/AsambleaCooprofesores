const conexion = require('../database/conexion');

exports.save = (req,res)=>{
    const asamblea = req.body.asamblea;
    const cedula = req.body.cedula;
    /* prueba de captura los datos */
/*     console.log(cedula + " - " + credencia); */
}

exports.read = (req,res)=>{
    /* prueba de captura los datos */
    let cedula = (req.body.cedula);

    console.log(cedula);
    /* conexion.query('select d.delegado_id ,d.delegado_documento_identificacion , d.delegado_nombres , d.delegado_tipo from	emodel.delegado d where  d.delegado_documento_identificacion = ${(cedula)}', (error,results)=>{
        if (error){
            throw error;
        }else{
            res.render('consulta', {results:results.rows});
        }
    }); */
}