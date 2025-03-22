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

// Se agrega el controlador que captura las rutas de eliminacion y llama 
// a la funcion en el Modulo. Pasa por parametro lo que reciba por url.
router.get('/eliminar/:id', async(req, res, next) =>{
  var id = req.params.id;
  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades')
});

module.exports = router;