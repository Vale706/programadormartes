var express = require('express');
var router = express.Router();
var novedadesModel= require('./../../models/novedadesModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



/* GET home page - LISTA LAS NOVEDADES. */ /*Trae el diseño*/
router.get('/', async function (req, res, next) { //Aca recibo la barra
  
  
  var novedades = await novedadesModel.getNovedades();
  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.image(novedad.img_id,{
        width:100,
        height:100,
        crop: 'fill'
      });
      return{
        ...novedad,
        imagen
      }
    }else{
      return{
        ...novedad,
        imagen:''
      }
    }
  });




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

  let novedad = await novedadesModel.getNovedadById(id);
  if(novedad.img_id){
    await (destroy(novedad.img_id));
  }



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
  try{
    
     var img_id = '';
     if(req.files && Object.keys(req.files).length > 0){
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
     }
    
    
    //Primero prueba que no esten vacios los campos
    if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
      await novedadesModel.insertNovedad({
        ...req.body,
        img_id
      });

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

//MODIFICAR funcion POST
router.post('/modificar',async (req, res, next)=>{
  try{
      let img_id = req.body.img_original;
      let borrar_img_vieja = false;
      if(req.body.img_delete ==="1"){
        img_id = null;
        borrar_img_vieja = true;
      }else{
        if(req.files && Object.keys(req.files).length > 0){
          imagen = req.files.imagen;
          img_id = (await uploader(imagen.tempFilePath)).public_id;
          borrar_img_vieja = true;
        }
      }
      if (borrar_img_vieja && req.body.img_original){
        await(destroy(req.body.img_original))
      }
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id
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