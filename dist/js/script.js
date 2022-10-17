$(document).ready(function(){
  //carusel
    $('.carusel__inner').slick({
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/l_arrow.png" alt="Previus"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/r_arrow.png" alt="Next"></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: true,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]

    });
//tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
/* 
    $('.catalog-ithem__link').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-ithem__content').eq(i).toggleClass('catalog-ithem__content_active');
        $('.catalog-ithem__list').eq(i).toggleClass('catalog-ithem__list_active');
      })
    });

    $('.catalog-ithem__back').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-ithem__content').eq(i).toggleClass('catalog-ithem__content_active');
        $('.catalog-ithem__list').eq(i).toggleClass('catalog-ithem__list_active');
      })
    }); */

  function toggleSlide(item){
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-ithem__content').eq(i).toggleClass('catalog-ithem__content_active');
        $('.catalog-ithem__list').eq(i).toggleClass('catalog-ithem__list_active');
      })
    });
  };

  toggleSlide('.catalog-ithem__link');
  toggleSlide('.catalog-ithem__back');



//modal

  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn();
  });
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

 

  //vercnuma anuny apranqi u texapoxuma modali mej
  $('.button_mini').each(function(i){ 
      $(this).on('click', function(){
        //vercnum enq texty .catalog-ithem__subtitle
        $('#order .modal__descr').text($('.catalog-ithem__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
      })

  });

  
    function validateForms(form){
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
            name: {
            required: "Пожалуста, введите свое имя",
            minlength: jQuery.validator.format("Ведите минимум {0} символа!")
          },
          phone: "Пожалуста, введите свой номер телефона",
          email: {
            required: "Пожалуста, введите свою почту",
            email: "Неправильный адрес почты  name@domain.com"
          }
        }
    
      });
    };

   validateForms('#consultation-form');
   validateForms('#consultation form');
   validateForms('#order form');

    $('input[name=phone]').mask("+374 (99)-999-999");
    $('form').submit(function(e){
      e.preventDefault();


     /*  if(!$(this).valid()){
        return;
      } */



      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');

      });
      return false;

    });

    //scrollup ete menq scroll enq arel 1600 px ekrani verevic depi nerqev apa haytvnum e mer page up icon-y
    $(window).scroll(function(){
      if($(this).scrollTop()>1600) {
        $('.pageup').fadeIn();
      } else
        $('.pageup').fadeOut();
    });

    $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop:$(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();

  });