var express = require('express');
var router = express.Router();
var novedadesModel= require('./../../models/novedadesModel');



/* GET home page. */ /*Trae el diseño*/
router.get('/', async function (req, res, next) { //Aca recibo la barra
  var novedades = await novedadesModel.getNovedades();  
  res.render('admin/novedades',{    //novedades.hbs
      layout:'admin/layout',
      usuario: req.session.nombre,
      novedades
  }); 
}),

//ELIMINAR -> Se agrega el controlador que captura las rutas de eliminacion y llama 
// a la funcion en el Modulo. Pasa por parametro lo que reciba por url.
router.get('/eliminar/:id', async(req, res, next) =>{
  var id = req.params.id;
  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades')
});

//AGREGAR -> Para que se vea el formulario de Agregar
router.get('/agregar', (req,res, next) =>{
  res.render('admin/agregar', {
    layout: 'admin/layout'
  })
});


//AGREGAR funcion POST
router.post('/agregar',async (req, res, next)=>{
  
  try{//Primero prueba que no esten vacios los campos
    if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
      await novedadesModel.insertNovedad(req.body);

      res.redirect('/admin/novedades')
    } else{
      res.render('admin/agregar',{
        layout:'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch(error){
    console.log(error)
    res.render('admin/agregar',{
      layout:'admin/layout',
      error: true,
      message:'No se cargo la novedad'
    })
  }
})

//Función get para Modificar

router.get('/modificar/:id', async (req, res, next) =>{
  var id = req.params.id;

  var novedad =await novedadesModel.getNovedadById(id);
  res.render('admin/modificar', { //Muestra el hbs de Modificar
    layout:'admin/layout',
    novedad
  });
});

//AGREGAR funcion POST
router.post('/modificar',async (req, res, next)=>{
  
  try{
    var obj = {
      titulo: req.body.titulo,
      subtitulos: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }

    console.log(obj)//para ver si trae los datos
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');

  } catch(error){
    console.log(error)
    res.render('admin/modificar',{
      layout:'admin/layout',
      error: true,
      message:'No se modifico la novedad'
    })
  }
});


module.exports = router;