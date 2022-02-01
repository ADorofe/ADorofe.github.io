'use strict';

$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    animateOut: 'animate__zoomOut',
    animateIn: 'animate__zoomIn',
    items: 1,
    lazyLoad: true,
    loop: true,
    margin: 0,
    nav: false,
    dots: true,
    margin: 0,
    checkVisible: false,
    items: 1,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
  });
});

$('#formPhone').mask('+375 (99) 999-99-99');

document.addEventListener('DOMContentLoaded', function () {
  const menu = new Mmenu('#mMenu', {
    navbar: {
      title: 'Основное меню сайта',
    },
  });

  $('#openForm, #mobil-openForm').click(function () {
    event.preventDefault();
    $('#popupForm').addClass('popup--active');
  });

  $('#closeForm').click(function () {
    event.preventDefault();
    $('#popupForm').removeClass('popup--active');
  });

  $('#closeSuccess').click(function () {
    event.preventDefault();
    $('#popupSuccess').removeClass('popup--active');
    $('#popupForm').removeClass('popup--active');
  });

  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      let response = await fetch('../sendmail.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        $('#popupSuccess').addClass('popup--active');
        let result = await response.json();
        alert(result.message);
        form.reset();
      } else {
        alert('Фатальная ошибка!');
      }
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReg = document.querySelectorAll('._reg');

    for (let i = 0; i < formReg.length; i++) {
      const input = formReg[i];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error = 1;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error = 1;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.classList.remove('_error');
  }
  function emailTest(input) {
    return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
      input.value,
    );
  }
});
