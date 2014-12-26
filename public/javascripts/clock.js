/**
 * clock.js
 */
jQuery(function ($) {
    var menu_open = false;

    function section(href, menu) {
        if (typeof menu === 'undefined') {
            $('#menu button').html(
                '<i class="glyphicon glyphicon-align-justify"></i>'
            );
        }
        else {
            $('#menu button').html(
                $(menu).html()
            );
        }

        $('section').addClass('hidden');
        $(href).removeClass('hidden');
    }

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
        if ($('#clock').hasClass('hidden')) {
            section('#clock');
        }
        $('#message').load('https://decoupled.de/lena.php');
    }, 300000);

    $('#menu').on('click', 'button', function (e) {
        e.preventDefault();
        if (menu_open) {
           $('#menu ul').hide();
           menu_open = false;
        }
        else {
           $('#menu ul').show();
           menu_open = true;
        }
    });

    $('#menu').on('click', 'a', function (e) {
        $('#menu ul').hide();

        var href = $(this).attr('href');

        if (href.match(/^javascript:/)) {
            return;
        }

        section(href, this);
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

