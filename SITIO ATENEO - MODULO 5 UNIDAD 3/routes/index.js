var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer')
var novedadesModel = require('../models/novedadesModel');
var cloudinary= require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  
  var novedades = await novedadesModel.getNovedades();

novedades = novedades.splice(0,5); //Selecciona los 5 primeros elementos del array

novedades = novedades.map(novedad =>{
   if(novedad.img_id){
    const imagen = cloudinary.url(novedad.img_id,{
      width:460,
      crop:'fill'
    });
    return{
      ...novedad,
      imagen
    }
   } else{
    return{
      ...novedad,
      imagen: '../img/noimage.jpg'
    }
   }
});



  res.render('index',{
    novedades
  });
});

router.post('/', async (req, res, next) => {

  var email = req.body.email;
  var comentario = req.body.comentario;
  /**CAPTURAN LA INFO */

var obj = {
  to: 'andree.se.07@gmail.com',
  subject: 'Contactos desde Formulario Web', 
  html:"Responder al mail " + email + "<br>Dejo el siguiente comentario:  " + comentario
}

var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
})

/**GENERO UNA VBLE QUE REALICE EL TRANSPORTE */
var info = await transporter.sendMail(obj);
res.render('index',{
  message:'Mensaje enviado correctamente',
});
});//CIERRE PETICION DE POST

module.exports = router;
