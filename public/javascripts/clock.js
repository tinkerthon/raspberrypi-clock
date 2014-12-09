/**
 * clock.js
 */
jQuery(function () {
    // every 1s
    setInterval(function () {
        var d = new Date(),
            hour = d.getHours(),
            min = d.getMinutes();

        $('#time').text(
            (hour < 10 ? '0' : '') + String(hour)
            + ':' + (min < 10 ? '0' : '') + String(min)
            + ' Uhr'
        );
    }, 1000);
    
    // every 5m
    setInterval(function () {
        $('#message').load('https://decoupled.de/lena.php');
    }, 300000);
    
    $('#menu').on('click', 'a', function (e) {
        var href = $(this).attr('href');
        
        if (href.match(/^javascript:/)) {
            return;
        }

        $('#menu a').removeClass('active');
        $(this).addClass('active');

        $('section').addClass('hidden');
        $(href).removeClass('hidden');

        e.preventDefault();
    });

    $('a.color').click(function (e) {
      e.preventDefault();
      
      $.get('/blinkstick', {
        op: 'morph',
        rgb: $(this).attr('href')
      });
    });

    $('a.music').click(function (e) {
      e.preventDefault();
      
      $.get('/music', {
        op: $(this).attr('href')
      });
    });
});

