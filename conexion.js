const { Pool } = require('pg');

const pool = new Pool({
  user: 'adm_evoto',
  password: '4dm_3v0t0',
  host: '20.55.38.188',
  port: 5444,
  database: 'evoto'
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error adquiriendo el cliente', err.stack)
  }
  console.log('Conexión exitosa a la base de datos')

  // ejecutar una consulta en la base de datos
  // client.query('SELECT NOW()', (err, res) => {
  //   release();
  //   if (err) {
  //     return console.error('Error ejecutando la consulta', err.stack)
  //   }
  //   console.log('Resultado de la consulta:', res.rows[0])
  // }) texto de prueba

});


