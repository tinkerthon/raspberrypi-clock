var blinkstick = require('blinkstick');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

function bright(res, led, rgb) {
  led.morph(rgb, {index: 0}, function () {
    led.morph(rgb, {index: 2}, function () {
      led.morph(rgb, {index: 4}, function () {
        led.morph(rgb, {index: 6}, function () {
          res.send({ status: 'OK' });    
        });
      });
    });
  });
}

router.get('/blinkstick', function(req, res) {
  var led = blinkstick.findFirst();

  if (typeof req.query.op === 'undefined') {
    res.send({ status: 'ERR' });
  }
  else
  if (req.query.op == 'random') {
    led.setColor('random', function () {
      res.send({ status: 'OK' });
    });
  }
  else
  if (req.query.op == 'off') {
    led.turnOff();
    res.send({ status: 'OK' });
  }
  else
  if (req.query.op == 'pulse') {
    led.pulse(req.query.rgb, function () {
      res.send({ status: 'OK' });
    });
  }
  else
  if (req.query.op == 'morph') {
    bright(res, led, req.query.rgb);
  }
  else {
    led.setColor(req.query.op, function () {
      res.send({ status: 'OK' });
    });
  }
});

module.exports = router;
