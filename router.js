const express = require ('express');
const router = express.Router();
const conexion = require('./database/conexion');

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/consulta',(req,res)=>{
    res.render('consulta');
    /* conexion.query('SELECT * FROM emodel.delegado', (error,results)=>{
        if (error){
            throw error;
        }else{
            res.send(results);
        }
    }); */
})

router.get('/contacto',(req,res)=>{
    res.send('Este es para una de las vistas');
});

module.exports = router;
