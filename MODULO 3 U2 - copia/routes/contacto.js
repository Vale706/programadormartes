var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//   res.send('Hola Soy contacto');

  res.render('contacto'); /**contacto será una diseño hbs o sea  un archivo contacto.hbs 
  donde trabajara el diseño del formulario con html y css*/
});

module.exports = router;