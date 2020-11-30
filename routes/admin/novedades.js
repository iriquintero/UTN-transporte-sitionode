var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');


/* GET galeria page. */
router.get('/', async function(req, res, next) {
  var novedades
  if (req.query.q === undefined){
    novedades = await novedadesModel.getNovedades();
  }else {
    novedades = await novedadesModel.buscarNovedades(req.query.q);
  }
  res.render('admin/novedades',{
    layout:'admin/layout',
    usuario:req.session.nombre,
    novedades,
    is_search:req.query.q !== undefined,
    q:req.query.q
  });
});

router.get('/nuevo',(req, res, next)=>{
  res.render('admin/nuevo',{
    layout:'admin/layout',
  });
});

router.post('/nuevo',async (req, res, next)=>{
  try{
    if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
      await novedadesModel.insertNovedades(req.body);
      res.redirect('/admin/novedades');
    }else{
      res.render('admin/nuevo',{
        layout:'admin/layout',
        error:true,
        mensaje:'Todos los campos son requeridos'
      });
    }

  }catch (error){
    console.log(error)
    res.render('admin/nuevo',{
      layout:'admin/layout',
      error:true,
      mensaje:'No se cargo el mensaje'
    });
  };
});

router.get('/eliminar/:id', async(req, res, next)=>{
    var id = req.params.id;
    await novedadesModel.deleteNovedadesByID(id);
    res.redirect('/admin/novedades')
});
//para modificar > traer los datos para que pueda modificar
router.get('/modificar/:id', async (req, res, next)=>{
    var id = req.params.id;
    var novedades = await novedadesModel.getNovedadesById(id);
    res.render('admin/modificar',{
      layout:'admin/layout',
      novedades
    });
});
//para actualizar los datos de la modificación

router.post('/modificar', async(req,res,next)=>{
  try{
    var obj = {
      titulo:req.body.titulo,
      subtitulo:req.body.subtitulo,
      cuerpo:req.body.cuerpo
    }
    await novedadesModel.modificarNovedadById(obj,req.body.id);
    res.redirect('/admin/novedades');
  }catch(error){
    console.log(error)
    res.render('admin/modificar',{
      layout:'admin/layout',
      error:true,
      mensaje:'No se modifico la novedad'
    });
  };
});

module.exports = router;