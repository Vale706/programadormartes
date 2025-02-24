var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
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
