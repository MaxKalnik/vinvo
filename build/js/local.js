var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var body = $('body');

// google map api
function initMap() {
  var place = {lat: 50.451395, lng: 30.518299};
  var map = new google.maps.Map(
  document.getElementById('map1'), {zoom: 16, center: place});
  var marker = new google.maps.Marker({position: place, map: map});

  var place2 = {lat: 50.413143, lng: 30.664040};
  var map2 = new google.maps.Map(
  document.getElementById('map2'), {zoom: 16, center: place2});
  var marker = new google.maps.Marker({position: place2, map: map2});
}


function makeSelectCustom(element) {
  element.each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    if($this.data('placeholder')) {
      $styledSelect.text($this.data('placeholder'));
    }

    var $list = $('<ul />', {
        'class': 'select-options'
    })

    var $selected;
    var $selectedInd;

    for (var i = 0; i < numberOfOptions; i++) {
      if($this.children('option').eq(i).is(':selected')) {
        $selected = $this.children('option').eq(i);
        $selectedInd = i;
      }
      $('<li />', {
          class: 'select-item',
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }

    $list.insertAfter($styledSelect);

    var $listItems = $list.children('li');

    if($selected) {
      $styledSelect.text($selected.text());
      $($listItems[$selectedInd]).hide();
    }

    $styledSelect.attr('tabindex', 0);
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
        $(this).parents('.select').toggleClass('select--active');
    });

    $styledSelect.keydown(function(e){
      if(e.which === ENTER_KEYCODE) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
        $(this).parents('.select').toggleClass('select--active');
      }
    });

    $listItems.attr('tabindex', 0);

    function addHover() {
      $(this).parents('.select').addClass('select--first-hover');
    }

    function removeHover() {
      $(this).parents('.select').removeClass('select--first-hover');
    }

    function hoverHander() {
      var firstItem = $listItems.eq(0);
      if(firstItem.css("display") === 'none') {
        $listItems.eq(1).on('mouseenter', addHover);
        $listItems.eq(1).on('mouseleave', removeHover);
        $listItems.eq(0).off('mouseenter', addHover);
        $listItems.eq(0).off('mouseleave', removeHover);
      } else {
        $listItems.eq(0).on('mouseenter', addHover);
        $listItems.eq(0).on('mouseleave', removeHover);
        $listItems.eq(1).off('mouseenter', addHover);
        $listItems.eq(1).off('mouseleave', removeHover);
      }
    }
    hoverHander();

    $listItems.click(function(e) {
        $listItems.show();
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $(this).hide();
        $list.hide();
        $(this).parents('.select').removeClass('select--active');
        $('.select').removeClass('select--first-hover');
        hoverHander();
    });

    $listItems.keydown(function(e){
      if(e.which === ENTER_KEYCODE) {
        $listItems.show();
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $(this).hide();
        $list.hide();
        $(this).parents('.select').removeClass('select--active');
        $('.select').removeClass('select--first-hover');
        hoverHander();
      }
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
        $('.select').removeClass('select--active');
    });
    $(document).keydown(function(e) {
      if(e.which === ESC_KEYCODE) {
        $styledSelect.removeClass('active');
        $list.hide();
        $('.select').removeClass('select--active');
      }
    });
  });
};

$('.popup__form-select').each(function() {
  makeSelectCustom($(this));
})
// testiomonials slider
if($('.testimonials__slides-list').length) {
  var index, bullets, $slider, $sliderLength, $left_btn, $right_btn, $sliderWidth, $slideWidth;
  function initVars() {
    index = 0;
    $bullets = $('.testimonials__pointers-item');
    $slider = $('.testimonials__slides-list');
    $sliderLength = $('.testimonials__list-item').length;
    $left_btn = $('.testimonials__list-controls--left');
    $right_btn = $('.testimonials__list-controls--right');
    $sliderWidth = $('.testimonials__slides-list').width();
    $slideWidth = $sliderWidth / $sliderLength;
    document.querySelector(".testimonials__slides-list").style.transform = "translateX(0)";
  };

  initVars();

  function checkBullets() {
    $bullets.removeClass('testimonials__pointers-item--active');
    $($bullets[index]).addClass('testimonials__pointers-item--active');
  };
  checkBullets();

  function checkUI() {
    if(index > 0 && index < $sliderLength - 1) {
      $($left_btn).removeClass('testimonials__list-controls--inactive');
    }
    else if (index === 0) {
      $($left_btn).addClass('testimonials__list-controls--inactive');
      $($right_btn).removeClass('testimonials__list-controls--inactive');
    }
    else if(index === $sliderLength - 1) {
      $($right_btn).addClass('testimonials__list-controls--inactive');
      $($left_btn).removeClass('testimonials__list-controls--inactive');
    }
  };

  function next() {
    checkUI();
    if(index === $sliderLength - 1) {
      var range = 0;
    } else {
      var range = $slideWidth + $slideWidth * index;
    }
    document.querySelector(".testimonials__slides-list").style.transform = "translateX(-" + range + "px)";
    if(index === $sliderLength - 1) {
      index = 0;
    } else {
      index++;
    }
    checkBullets();
    checkUI();
  };

  function prev() {
    if(index === 0) {
      var range = -$slideWidth * ($sliderLength - 1);
    } else {
      var range = ($slideWidth - $slideWidth * index);
    }
    document.querySelector(".testimonials__slides-list").style.transform = "translateX(" + range + "px)";
    if(index === 0) {
      index =  $sliderLength - 1;
    } else {
      index--;
    }
    checkBullets();
    checkUI();
  };

  $('.testimonials__list-controls--left').swipe({
    tap: function(event, target) {
      prev();
    }
  });
  $('.testimonials__list-controls--right').swipe({
    tap: function(event, target) {
      next();
    }
  });
  $('.testimonials__pointers-item').swipe({
    tap: function(event, target) {
      var id = $(this).data('id');
    document.querySelector(".testimonials__slides-list").style.transform = "translateX(-" + ($slideWidth * (+id)) + "px)";
    index = id;
    checkBullets();
    checkUI();
    }
  });

  $(window).resize(throttle(initVars, 500, {leading: false}))
}

var currentForm;

function send(data, onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      currentForm = data;
    } else {
      console.log('Ошибка ' + xhr.status);
    }
  });

  xhr.open('POST', URL.post);
  xhr.send(data);
}

// make all popups by one class, maybe using coffeescript

// popup
function dialogCommonHandler($activateEl) {
  var popupId = $activateEl.data('id');
  var $popup = $('#' + popupId);
  var $popupClose = $popup.find('.popup__close-btn');
  var $popupBtn = $popup.find('.popup__submit-btn');
  var $form = $activateEl.parents('form');

  $($activateEl).click(function() {
    $('.popup').hide();
    $popup.show();
    if($form.length > 0) {
      send(new FormData($form));
    }
  });

  $($activateEl).keydown(function(e) {
    if(e.which === ENTER_KEYCODE) {
      $popup.show();
    }
  });

  $($popupClose).swipe({
    tap: function(event, target) {
      $popup.hide();
    }
  });

  $(document).keydown(function(e){
    if(e.which === ESC_KEYCODE) {
      $popup.hide();
    }
  });

  $($popupBtn).swipe({
    tap: function(event, target) {
      event.preventDefault();
      $popup.hide();
    }
  });
  $popupBtn.keydown(function(e){
    if(e.which === ENTER_KEYCODE) {
      $popup.hide();
    }
  });
}

dialogCommonHandler($('.header__callback-form-btn'));
dialogCommonHandler($('.header__callback-btn'));
dialogCommonHandler($('.best-price__button'));
dialogCommonHandler($('.budget-price__button'));
dialogCommonHandler($('.popup__form-btn'));
dialogCommonHandler($('.main-steps__button--defined'));
dialogCommonHandler($('.main-steps__button--undefined'));
dialogCommonHandler($('.contacts__callback-button'));
dialogCommonHandler($('.info__proposals-form-btn'));

$('.footer__tel-toggle').swipe({
  tap: function(event, target) {
    $(this).parents('.footer__tel-numbers').toggleClass('footer__tel-numbers--active');
  }
});

$('.header__tel-toggle').swipe({
  tap: function(event, target) {
    $(this).parents('.header__tel-numbers').toggleClass('header__tel-numbers--active');
  }
});

$(document).mouseup(function(e) {
    var container = $('.header__tel-numbers');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass('header__tel-numbers--active');
    }
});
$(document).mouseup(function(e) {
    var container = $('.footer__tel-numbers');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass('footer__tel-numbers--active');
    }
});

$('.popup__form-switcher-label--defined').swipe({
  tap: function(event, target) {
    $(this).parents('.popup__wrapper').removeClass('popup__wrapper--full');
  }
});

$('.popup__form-switcher-label--undefined').swipe({
  tap: function(event, target) {
    $(this).parents('.popup__wrapper').addClass('popup__wrapper--full');
  }
});


