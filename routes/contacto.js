var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');

/* GET contacto page. */
router.get('/', function(req, res, next) {
  res.render('contacto',{
    isContacto:true
  });
});

router.post('/', async (req, res, next)=>{
   console.log(req.body);// ver si me estoy trayendo los datos del name.
   var nombre= req.body.nombre;
   var email=req.body.email;
   var telefono=req.body.telefono;
   var mensaje=req.body.comentario;

   var obj={
     to:'iriangel.quintero@gmail.com',
     subject:'Contacto desde la web',
     html: nombre + ", Se contacto a través y quiere mas información a este correo: "+ email +".<br> Además, hizo el siguiente comentario: "+ mensaje + ". <br> Su teléfono es "+ telefono
   }//cierra el obj
   var transport = nodemailer.createTransport({
      host:process.env.SMTP_HOST,
      port:process.env.SMTP_PORT,
      auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
      }
    });//cierra transporter
   var info = await transport.sendMail(obj);
   res.render('contacto', {
     message:'Mensaje enviado correctamente'
   });
});//cierra petición del post

module.exports = router;
