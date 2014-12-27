/**
 * Aufruf mit
 * env DEBUG=`pwd` BRIGHT=4 PORT=8888 bin/www
 */
var blinkstick = require('blinkstick');
var mpd = require('komponist');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/**
 * Switch LEDs, one after the other
 * @param BRIGHT {1, 2, 4, 8}
 */
function morph(res, led, rgb) {

  /**
   * Generate a function to morph LED i with callback f
   */
  function gen(i, f) {
    return function () {
      console.log("i:", i, "rgb:", rgb);
      //led.morph(rgb, {index: i-1, duration: 100}, f);
      led.setColor(rgb, {index: i-1}, f);
    };
  }

  var
    i,
    step = 8 / (process.env.BRIGHT || 8),
    f = function () { res.send({ status: 'OK' }); };

  console.log("MORPH", step);

  // Create nested callbacks
  for (i = step; i <= 8; i += step) {
    f = gen(i, f);
  }
  f();
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
    morph(res, led, req.query.rgb);
  }
  else {
    led.setColor(req.query.op, function () {
      res.send({ status: 'OK' });
    });
  }
});

router.get('/music', function(req, res) {

  mpd.createConnection(function(err, client) {
    if (typeof req.query.op === 'undefined') {
      res.send({ status: 'ERR' });
    }
    else
      switch (req.query.op) {
      case '#prev':
        client.previous();
        break;
      case '#next':
        client.next();
        break;
      case '#play':
        client.play();
        break;
      case '#stop':
        client.stop();
        break;
      }
  });

  res.send({ status: 'OK' });

});

router.get('/ip', function(req, res) {
  var os = require('os');
  var ifaces = os.networkInterfaces();
  var addr = [];
  for (var dev in ifaces) {
    var alias = 0;
    ifaces[dev].forEach(function(details){
      if (details.family == 'IPv4' && details.internal === false) {
        addr.push({dev: dev + (alias ? ':' + alias : ''), ip: details.address});
        ++alias;
      }
    });
  }
  res.send({ status: 'OK', addr: addr });
});

module.exports = router;
