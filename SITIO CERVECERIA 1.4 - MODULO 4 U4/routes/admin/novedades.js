var express = require('express');
var router = express.Router();


/* GET home page. */ /*Trae el diseño*/
router.get('/', function (req, res, next) { //Aca recibo la barra
  res.render('admin/novedades',{    //novedades.hbs
      layout:'admin/layout',
      usuario: req.session.nombre,
  }); 
});


module.exports = router;