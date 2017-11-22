jQuery(document).ready(function($) {

  /* ---------------------------------------------------------------------- */
  /*	------------------------------- Loading ----------------------------- */
  /* ---------------------------------------------------------------------- */

  /*Page Preloading*/
  $(window).load(function() {
    $('#spinner').fadeOut(200);
    $('#preloader').delay(200).fadeOut('slow');
    $('.wrapper').fadeIn(200);
    $('#custumize-style').fadeIn(200);
  });

  /* ---------------------------------------------------------------------- */
  /* ------------------------------- Taps profile ------------------------- */
  /* ---------------------------------------------------------------------- */

  $('.collapse_tabs').click(function() {

    if ($(this).hasClass('collapsed')) {
      $(this).find('i.glyphicon').removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    } else {
      $(this).find('i.glyphicon').removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
    }

  });

  /* ---------------------------------------------------------------------- */
  /* -------------------------- easyResponsiveTabs ------------------------ */
  /* ---------------------------------------------------------------------- */

  $('#verticalTab').easyResponsiveTabs({
    type: 'vertical',
    width: 'auto',
    fit: true
  });

  $("h2.resp-accordion").click(function() {
    $(this).find(".icon_menu").addClass("icon_menu_active");
    $("h2.resp-accordion").not(this).find(".icon_menu").removeClass("icon_menu_active");

    /*	Scroll To */
    $('html, body').animate({scrollTop: $('h2.resp-accordion').offset().top - 50}, 600);
  });

  $(".resp-tabs-list li").click(function() {
    $(this).find(".icon_menu").addClass("icon_menu_active");
    $(".resp-tabs-list li").not(this).find(".icon_menu").removeClass("icon_menu_active");
  });


  $(".resp-tabs-list li").hover(function() {
    $(this).find(".icon_menu").addClass("icon_menu_hover");
  }, function() {
    $(this).find(".icon_menu").removeClass("icon_menu_hover");
  });

  $("h2.resp-accordion").hover(function() {
    $(this).find(".icon_menu").addClass("icon_menu_hover");
  }, function() {
    $(this).find(".icon_menu").removeClass("icon_menu_hover");
  });

  /* ---------------------------------------------------------------------- */
  /* --------------------------- Scroll tabs ------------------------------ */
  /* ---------------------------------------------------------------------- */

  $(".content_2").mCustomScrollbar({
    theme: "dark-2",
    contentTouchScroll: true,
    advanced: {
      updateOnContentResize: true,
      updateOnBrowserResize: true,
      autoScrollOnFocus: false
    }
  });

  /* ---------------------------------------------------------------------- */
  /* ------------------------- Effect tabs -------------------------------- */
  /* ---------------------------------------------------------------------- */

  var animation_style = 'fadeInDown';

  $('.dropdown-select').change(function() {
    animation_style = $('.dropdown-select').val();
  });


  $('ul.resp-tabs-list li[class^=tabs-]').click(function() {

    var tab_name = $(this).attr('data-tab-name');

    $('.resp-tabs-container').addClass('animated ' + animation_style);
    $('.resp-tabs-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.resp-tabs-container').removeClass('animated ' + animation_style);
    });

    $(".content_2").mCustomScrollbar("destroy");
    $(".content_2").mCustomScrollbar({
      theme: "dark-2",
      contentTouchScroll: true,
      advanced: {
        updateOnContentResize: true,
        updateOnBrowserResize: true,
        autoScrollOnFocus: false
      }
    });


    return false;
  });



  /* ---------------------------------------------------------------------- */
  /* ---------------------- redimensionnement ----------------------------- */
  /* ---------------------------------------------------------------------- */

  function redimensionnement() {

    if (window.matchMedia("(max-width: 800px)").matches) {
      $(".content_2").mCustomScrollbar("destroy");
      $(".resp-vtabs .resp-tabs-container").css("height", "100%");
      $(".content_2").css("height", "100%");
    } else {

      $(".resp-vtabs .resp-tabs-container").css("height", "580px");
      $(".content_2").css("height", "580px");
      $(".content_2").mCustomScrollbar("destroy");
      $(".content_2").mCustomScrollbar({
        theme: "dark-2",
        contentTouchScroll: true,
        advanced: {
          updateOnContentResize: true,
          updateOnBrowserResize: true,
          autoScrollOnFocus: false
        }
      });

    }

  }

  // On lie l'événement resize à la fonction
  window.addEventListener('load', redimensionnement, false);
  window.addEventListener('resize', redimensionnement, false);

  /* ---------------------------------------------------------------------- */
  /* -------------------------- Contact Form ------------------------------ */
  /* ---------------------------------------------------------------------- */

  var $contactform = $('#contactForm');
  $contactform.click(function() {
    console.log("entro aqui");
    $("#contactForm > input, #contactForm > textarea").jqBootstrapValidation({

      preventSubmit: true,
      submitError: function($form, event, errors) {
        console.log("entro aqui error de la validacion");
        return false;
      },
      submitSuccess: function($form, event) {
        console.log("entro aqui sin errores en la validacion, todo funcionando ok ");
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        var name = $("input#name").val();
        var email = $("input#email").val();
        var message = $("textarea#message").val();
        var firstName = name; // For Success/Failure Message
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
          firstName = name.split(' ').slice(0, -1).join(' ');
        }
        $.ajax({
          url: "contact/",
          data: {
            name: name,
            email: email,
            message: message
          },
          cache: false,
          success: function() {
            // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
            $('#success > .alert-success')
            .append("<strong>Tu mensaje fue enviado. </strong>");
            $('#success > .alert-success')
            .append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
          },
          error: function() {
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
            $('#success > .alert-danger').append("<strong>Lo lamento " + firstName + ", al parecer el servidor de correo no esta respondiendo. Intenta más tarde!");
            $('#success > .alert-danger').append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");
          },
        })
      },
      filter: function() {
        return $(this).is(":visible");
      },
    });
    $("a[data-toggle=\"tab\"]").click(function(e) {
      e.preventDefault();
      $(this).tab("show");
    });
  });

  /* ---------------------------------------------------------------------- */
  /* ----------------------------- Portfolio ------------------------------ */
  /* ---------------------------------------------------------------------- */


  var filterList = {
    init: function() {

      // MixItUp plugin
      // http://mixitup.io
      $('#portfoliolist').mixitup({
        targetSelector: '.portfolio',
        filterSelector: '.filter',
        effects: ['fade'],
        easing: 'snap',
        // call the hover effect
        onMixEnd: filterList.hoverEffect()
      });

    },
    hoverEffect: function() {

      // Simple parallax effect
      $('#portfoliolist .portfolio').hover(
        function() {
          $(this).find('.label').stop().animate({bottom: 0}, 200);
          $(this).find('img').stop().animate({top: -30}, 500);
        },
        function() {
          $(this).find('.label').stop().animate({bottom: -40}, 200);
          $(this).find('img').stop().animate({top: 0}, 300);
        }
      );

    }

  };

  // Run the show!
  filterList.init();

  /* ---------------------------------------------------------------------- */
  /* ----------------------------- prettyPhoto ---------------------------- */
  /* ---------------------------------------------------------------------- */

  $("a[rel^='portfolio']").prettyPhoto({
    animation_speed: 'fast', /* fast/slow/normal */
    social_tools: '',
    theme: 'pp_default',
    horizontal_padding: 5,
    deeplinking: false,
  });



  /* ---------------------------------------------------------------------- */
  /* --------------------------------- Blog ------------------------------- */
  /* ---------------------------------------------------------------------- */

  // More blog
  $('a.read_m').click(function() {
    var pagina = $(this).attr('href');
    var postdetail = pagina + '-page';

    if (pagina.indexOf("#post-") != -1) {

      $('#blog-page').hide();

      $(postdetail).show();
      $(".tabs-blog").trigger('click');
    }

    return false;

  });

  // More blog
  $('a.read_more').click(function() {
    var pagina = $(this).attr('href');
    var postdetail = pagina + '-page';

    if (pagina.indexOf("#post-") != -1) {

      $('#blog-page').hide();

      $(postdetail).show();
      $(".tabs-blog").trigger('click');
    }

    return false;

  });

  //pagination All
  $('.content-post a').click(function() {
    var pagina = $(this).attr('href');

    if (pagina == "#blog") {

      $('.content-post').hide();
      $('#blog-page').show();
      $(".tabs-blog").trigger('click');

    }

    return false;

  });

  //pagination blog
  $('.content-post #pagination').click(function() {


    var pagina = $(this).attr('href');
    var postdetail = pagina + '-page';

    if (pagina.indexOf("#post-") != -1) {

      $('#blog-page').hide();
      $('.content-post').hide();

      $(postdetail).show();
      $(".tabs-blog").trigger('click');
    }

    return false;

  });


  /* ---------------------------------------------------------------------- */
  /* ---------------------------- icon menu ------------------------------- */
  /* ---------------------------------------------------------------------- */

  $(".resp-tabs-container h2.resp-accordion").each(function(){

    if($(this).hasClass('resp-tab-active')){
      $(this).append("<i class='glyphicon glyphicon-chevron-up arrow-tabs'></i>");
    }else {
      $(this).append("<i class='glyphicon glyphicon-chevron-down arrow-tabs'></i>");
    }
  });

  $(".resp-tabs-container h2.resp-accordion").click(function(){
    if($(this).hasClass('resp-tab-active')){
      $(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
    }

    $(".resp-tabs-container h2.resp-accordion").each(function(){

      if(!$(this).hasClass('resp-tab-active')){
        $(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
      }
    });


  });


  /* ---------------------------------------------------------------------- */
  /* -------------------------------- skillbar ---------------------------- */
  /* ---------------------------------------------------------------------- */

  $('.tabs-resume').click(function() {

    $('.skillbar').each(function() {
      $(this).find('.skillbar-bar').width(0);
    });

    $('.skillbar').each(function() {
      $(this).find('.skillbar-bar').animate({
        width: $(this).attr('data-percent')
      }, 2000);
    });

  });

  $('#resume').prev('h2.resp-accordion').click(function() {

    $('.skillbar').each(function() {
      $(this).find('.skillbar-bar').width(0);
    });

    $('.skillbar').each(function() {
      $(this).find('.skillbar-bar').animate({
        width: $(this).attr('data-percent')
      }, 2000);
    });
  });






});
