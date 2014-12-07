/*
 */
var blinkstick = require('blinkstick');

exports.index = function(req, res) {
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
  if (req.query.op == 'blink') {
    led.blink(req.query.rgb, function () {
      res.send({ status: 'OK' });
    });
  }
  else {
    led.setColor(req.query.op, function () {
      res.send({ status: 'OK' });
    });
  }
};

export.edit = function(req, res) {
  res.render('blinkstick/edit');  
};
