var express = require('express');
var router = express.Router();
var usuariosModel= require('./../../models/usuariosModel')/**'./../../models/usuariosModel' */


/* GET home page. */ /*Trae el diseño*/
router.get('/', function (req, res, next) { //Aca recibo la barra
  res.render('admin/login',{    //login.hbs
      layout:'admin/layout'
  }); 
});


/**Para destruir la variable de sesion */
router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.render('admin/login',{
    layout:'admin/layout'
  });
})

router.post('/', async(req,res,next)=>{ /*Se crea para recibir los datos tomados en login.hbs*/
  try{
    var usuario = req.body.usuario;
    var password = req.body.password;

    console.log(req.body);

    var data = await 
    usuariosModel.getUserAndPassword (usuario, password);

    if(data != undefined ){
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      res.redirect('/admin/novedades'); /** Si esta OK s edirige a Novedades */
    }else{
      res.render('admin/login',{ /**Si esta erroneo se dirige de nuevo al login */
        layout: 'admin/layout',
        error: true/**Se habilita que se muestre un error en login.hbs */
      });
    }
  }catch(error){
    console.log(error);
  }
});

module.exports = router;