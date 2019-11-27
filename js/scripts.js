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

  // make link jumps scroll smooth
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      let offsetPosition = 0; // scroll to top if empty #
      let selector = this.getAttribute('href');
      if (selector !== '#') {
        let element = document.querySelector(selector);
        if (!element) return; // break if element doesn't exist to prevent a js error
        let elementPosition = element.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        let headerHeight = 50; // normally document.querySelector("nav.navbar").offsetHeight but our header changes height so we use a fixed value
        offsetPosition = elementPosition - headerHeight; // take header height into account
      }

      // element.scrollIntoView({ behavior: 'smooth'});
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // calculate year automatically
  let currentYear = new Date().getFullYear();
  $('#current-year').text(currentYear);

  // handle form submission
  $('#contact-form').submit((e) => {
    e.preventDefault();

    $('.submit-button').hide();
    $('.submit-spinner').show();

    let formdata = {};
    formdata['name'] = $('input[name="name"]').val();
    formdata['email'] = $('input[name="email"]').val();
    formdata['message'] = $('textarea[name="message"]').val();

    // console.log(formdata);

    var jqxhr = $.ajax({
      type: 'POST',
      url: 'php/form.php',
      data: formdata, //JSON.stringify(formdata),
    });

    jqxhr.done((data) => {
      console.log(data);
      let dataObj = isJsonString(data) ? JSON.parse(data) : null;
      if (dataObj && 'code' in dataObj && 'message' in dataObj) {
        let hasError = (dataObj['code'] !== 200);
        writeFormMessage(dataObj['message'], hasError);
      } else {
        console.error(data);
        writeFormMessage('Sorry, something went wrong.', true);
      }
    });

    jqxhr.fail((error) => {
      console.error(error);
      writeFormMessage('Sorry, something went wrong.', true);
    });

    jqxhr.always((error) => {
      $('.submit-spinner').hide();
      $('.submit-button').show();
    });

  });

  // returns a boolean. checks whether the given string is in json format
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  // write a feedback message to the user after submitting the form
  function writeFormMessage(message, hasError) {
    let formMessageEl = $('.form-message');
    formMessageEl.html(message);
    if (hasError) {
      formMessageEl.addClass('text-warning');
      formMessageEl.removeClass('text-success');
    } else {
      formMessageEl.addClass('text-success');
      formMessageEl.removeClass('text-warning');
    }
  }


});