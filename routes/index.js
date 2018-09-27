var express = require('express');
var router = express.Router();

//var dataCardBike =[];

/* GET home page. */
router.get('/', function(req, res, next) {
  var dataBike = [
    {name: "Model BIKO45", url:"/images/bike-1.jpg", price: 679},
    {name: "Model ZOOK7", url:"/images/bike-2.jpg", price: 799},
    {name: "Model LIKO89", url:"/images/bike-3.jpg", price: 839},
    {name: "Model GEWO", url:"/images/bike-4.jpg", price: 1206},
    {name: "Model TITAN5", url:"/images/bike-5.jpg", price: 989},
    {name: "Model AMIG39", url:"/images/bike-6.jpg", price: 599}
  ]
  res.render('index', { dataBike:dataBike });
});

//route du panier
router.get('/shop', function(req, res, next) {
  res.render('shop', {dataCardBike});
});

//ajout dans le panier
router.post('/add-shop', function(req, res, next) {
  console.log(req.body);
  console.log(req.session.bikes === undefined);
  //req.session.bikes vide
  if (req.session.bikes === undefined) {
    req.session.bikes = [req.body];
    console.log(req.session.bikes);
    res.render('shop', { dataCardBike : req.session.bikes });
  }
  //req.session.bikes existe
  else {
    req.session.bikes.push(req.body)
    console.log(req.session.bikes);
    res.render('shop', { dataCardBike : req.session.bikes });
  }
});


//suppr d'un element du panier
router.get('/delete-shop', function(req, res, next) {
  req.session.bikes.splice(req.query.position, 1)
  res.render('shop', {dataCardBike : req.session.bikes});
});

//modification d'un element du panier
router.post('/update-shop', function(req, res, next) {
  console.log(req.body);
  req.session.bikes[req.body.position].quantity = req.body.quantity;
  res.render('shop', {dataCardBike : req.session.bikes});
});

module.exports = router;
