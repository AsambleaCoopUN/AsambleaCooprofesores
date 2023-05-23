const { Connection } = require('pg');
const conexion = require('../database/conexion');
const { error } = require('jquery');
const { measureMemory } = require('vm');
let message;


exports.read = (req,res)=>{
  /* se asigna la cédula recibida a una constante */
  const cedula = (req.body.cedula);
  /* Query de búsqueda a la base de datos por el número de cedula*/
  const search = `select (select asamblea_id  from emodel.asamblea a  where asamblea_activa ='S') asamblea_id, 
  d.delegado_id, d.delegado_codigo_alterno ,d.delegado_documento_identificacion , d.delegado_nombres , d.delegado_tipo
  from emodel.delegado d 
  WHERE  d.delegado_documento_identificacion = '${cedula}'`;
  
  /* método que ejecuta el query y devuelve el resultado o el error obtenidos */
  conexion.query(search, (error, results) =>{
      if (error){
          throw error;
      }else{
          res.render('consulta', {results:results.rows});
      }
  });
}

exports.votacion = (req, res) => {
  const cookieValue = req.cookies.calterno; // Obtener el valor de la cookie
  const cookieData = JSON.parse(cookieValue); // Analizar el valor de la cookie como un objeto JSON
  const asambleaId = cookieData.asambleaId;
  const alterno = cookieData.alterno;
  
  const estadoSala = `select
  case aa.asistente_activo 
  when true then 'EN SALA' 
  when false then 'FUERA DE SALA' 
  end estado 
  from emodel.asistencia_asamblea aa 
  inner join emodel.delegado d 
  on d.delegado_id = aa.delegado_id 
  where asamblea_id = 1 and upper(d.delegado_codigo_alterno) = upper('${alterno}')`;

  const asistencia = `SELECT aa.asistencia_id
  from emodel.asistencia_asamblea aa, emodel.delegado d 
  where d.delegado_id = aa.delegado_id 
  and d.delegado_codigo_alterno  = '${alterno}'
  and  aa.asistente_activo = true
  order by aa.asistencia_id;`;

    conexion.query(estadoSala, (error,results)=>{
    if(error){
      console.log(error);
    }else{
      const estado = results.rows[0].estado;

      if (estado === "EN SALA"){
        conexion.query(asistencia, (error,results2)=>{
          if (error) {
            console.log(error);
          }else{
            const idasistencia = results2.rows[0].asistencia_id;

            const resDelegado = `select coalesce(count(*),0) 
            as conteo_respuesta_delegado
            from emodel.respuesta_pregunta rp 
            where  asistencia_id =   '${idasistencia}'
            and pregunta_opcion_id 
            in (select pregunta_opcion_id  from emodel.pregunta_opciones po where pregunta_id = (select pregunta_id  from emodel.pregunta_asamblea pa where bandera_votacion ='A'))`;

            conexion.query(resDelegado, (error,results3)=>{
              if (error) {
                console.log(error);
              }else{
                if (results3.rows[0].conteo_respuesta_delegado == 0){
                  res.send(`<script>window.location.href='/paVotar'</script>`);
                }else{
                  message = "Su voto ya a sido registrado";
                  res.send(`<script>if(confirm('${message}')){window.location.href='/'}</script>`);
                }
              }
            });
          }
        });
      }else{
        message = "Se encuentra fuera de la sala";
        res.send(`<script>if(confirm('${message}')){window.location.href='/'}</script>`);
      }
    }
  });
}

exports.paVotar = (req, res) => {
  const pregActiva= `SELECT pregunta_id, orden_pregunta, pregunta_enunciado, tipo_pregunta,
  CASE bandera_votacion
  WHEN 'E' THEN 'En espera de votación'
  WHEN 'C' THEN 'Pregunta Votada'
  WHEN 'A' THEN 'Pregunta en proceso de votación'
  END AS estado_pregunta
  FROM emodel.pregunta_asamblea pa
  WHERE bandera_votacion = 'A'
  ORDER BY orden_pregunta;`;
  
  conexion.query (pregActiva,(error, results)=>{
    if(error){
      console.log(error);
    }else{
      const pregunta = results.rows[0].pregunta_id;
      const estado = results.rows[0].estado_pregunta;
      if (estado==="Pregunta en proceso de votación"){
        const TexPregunta = `select po.pregunta_opcion_id, pa.pregunta_id, pa.orden_pregunta, pa.pregunta_enunciado, po.pregunta_opcion_ordinal || po.pregunta_opcion_enunciado
        AS opcion_enunciado 
        from emodel.pregunta_opciones po
        INNER JOIN emodel.pregunta_asamblea pa ON pa.pregunta_id = po.pregunta_id
        where pa.pregunta_id = (select pa2.pregunta_id  from emodel.pregunta_asamblea pa2 where pa2.bandera_votacion='A')
        order by pregunta_id , pregunta_opcion_orden;`;
        
        conexion.query(TexPregunta, (error, results2) => {
          if (error) {
            throw error;
          } else {
            res.render('pregunta', { results2: results2.rows });
          }
        });
      }else{
        message = "No se tienen preguntas en proceso de votación por favor espere";
        res.send(`<script>if(confirm('${message}')){window.location.href='/'}</script>`);
      }
    }
  });
}
