const express = require ('express');
const router = express.Router();
const conexion = require('./database/conexion');

router.get('/',(req,res)=> {
    res.render('index');
       /*  conexion.query('SELECT * FROM emodel.delegado', (error,results)=>{
        if (error){
            throw error;
        }else{
            res.send(results);
        }
    }); */
})

router.get('/consulta',(req,res)=>{
    conexion.query('SELECT * FROM emodel.delegado', (error,results)=>{
        if (error){
            throw error;
        }else{
            res.render('consulta', {results:results.rows});
        }
    });
})

router.get('/create', (req,res)=>{
    res.render('create');
})

const crud = require ('./controller/crud');
router.post('/save',crud.save)

router.get('/contacto',(req,res)=>{
    res.send('Este es para una de las vistas');
});

module.exports = router;
