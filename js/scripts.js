// scripts

$(document).ready(function() {

  // initialize swiper when document ready
  let mySwiper = new Swiper('.swiper-container', {
    speed: 900,
    spaceBetween: 100,

    // Optional parameters
    direction: 'horizontal',
    //loop: true,

    autoplay: {
      delay: 3000,
    },

    effect: 'coverflow',
    coverflowEffect: {
      rotate: 30,
      slideShadows: false,
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar (shows incorrectly in case of loop true)
    scrollbar: {
      el: '.swiper-scrollbar',
    },

  });


  // calculate year automatically
  let currentYear = new Date().getFullYear();
  $('#current-year').text(currentYear);

  // handle form submission
  $('#form').submit((e) => {
    e.preventDefault();
    let formdata = {};
    formdata['name'] = $('#form input[name="user_name"]').val();
    formdata['email'] = $('#form input[name="user_email"]').val();
    formdata['message'] = $('#form textarea[name="user_message"]').val();

    console.log(formdata);

    var jqxhr = $.ajax({
      type: 'POST',
      url: 'php/form.php',
      data: formdata, //JSON.stringify(formdata),
    });


    jqxhr.done((data) => {
      console.log('done');
      let answer = JSON.parse(data);
      console.log(answer);
      writeFormMessage(answer['message'], false);
    });

    jqxhr.fail((error) => {
      console.log('error');
      console.error(error);
    });

  });

  function writeFormMessage(message, error) {
    let formMessageEl = $('.form-message');
    formMessageEl.text(message);
    if (error) {
      formMessageEl.addClass('error');
    } else {
      formMessageEl.removeClass('error');
    }
  }


});