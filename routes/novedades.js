var express = require('express');
const novedadesModel = require('../models/novedadesModel');
var router = express.Router();
var novedades = require('../models/novedadesModel');

/* GET novedades page. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  res.render('novedades',{
    isNovedades:true,
    novedades
  });
});



module.exports = router;
