var express = require('express');
const novedadesModel = require('../models/novedadesModel');
var router = express.Router();
var novedades = require('../models/novedadesModel');

/* GET novedades page. */
router.get('/', async function(req, res, next) {
  var novedades
  if (req.query.q === undefined){
    novedades = await novedadesModel.getNovedades();
  }else {
    novedades = await novedadesModel.buscarNovedades(req.query.q);
  }
  res.render('novedades',{
    isNovedades:true,
    novedades,
    is_search:req.query.q !== undefined,
    q:req.query.q
  });
});

module.exports = router;
