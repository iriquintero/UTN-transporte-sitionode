var express = require('express');
var router = express.Router();
const usuariosmodel = require('./../../models/usuariosmodel');


/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('admin/login',{
    layout:'admin/layout'
  });
});
//para deslog.  > destruir la variable de ses 
router.get('/logout',function(req,res,next){
  req.session.destroy();//destroy es un metodo que està dentro del paquete express-session
  res.render('admin/login',{
    layout:'admin/layout'
  });
});

router.post('/',async(req,res,next)=>{

    try{
      var usuario = req.body.usuario;
      var password = req.body.password;

      var data = await usuariosmodel.getUserByUserNameAndPassword(usuario,password);

      if( data != undefined){

        req.session.id_usuario = data.id; //es el mismo que usamos en el app.js en if. 
        req.session.nombre = data.usuario;

        res.redirect('/admin/novedades');
       }else{
         res.render('admin/login',{
          layout:'admin/layout',
          error:true// agregar esto en hbs > login.hbs
         });
      }//cierre else
    } catch(error){
      console.log(error);
    } // cierro catch
});


module.exports = router;