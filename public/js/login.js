//pressing the login/signup will toggle the modal for user
$("#login").on("click", function() {
  event.preventDefault();
  $(".login-modal").css("display", "block");
});
$("#signup").on("click", function() {
  event.preventDefault();
  $(".signup-modal").css("display", "block");
});
//pressing on the document or the X will allow the user to close the modal
$("span").on("click", function() {
  event.preventDefault();
  $(".signup-modal").css("display", "none");
  $(".login-modal").css("display", "none");
  $(".send-money-modal").css("display", "none");
});

// ---------------CONTAINER2 CONTENT--------------//
$('.display-li').on('click',function(){
  $('#credit-card').addClass("box2")
  $("#credit-card").removeClass('box1')
  $('#manage-money').removeClass('box1')
  $('#buy-home').removeClass('box1')
  $('#buy-car').removeClass('box1')
  $('#invest').removeClass('box1')
})

$("#credit-card").on("click", function() {
  event.preventDefault();
  $("#credit-card-box").hide().fadeIn(300);
  $('#manage-money-box').hide();
  $('#buy-home-box').hide();
  $('#buy-car-box').hide();
  $('#invest-box').hide();

  $('#credit-card').addClass('box1')
});
$("#manage-money").on("click", function() {
  event.preventDefault();
  $("#credit-card-box").hide();
  $('#manage-money-box').hide().fadeIn(300);
  $('#buy-home-box').hide();
  $('#buy-car-box').hide();
  $('#invest-box').hide();

  $('#manage-money').addClass('box1');
});

$("#buy-home").on("click", function() {
  event.preventDefault();
  $("#credit-card-box").hide().fadeOut(500);
  $('#manage-money-box').hide().fadeOut(500);
  $('#buy-home-box').hide().fadeIn(500);
  $('#buy-car-box').hide().fadeOut(500);
  $('#invest-box').hide().fadeOut(500);

  $('#buy-home').addClass('box1');
});

$("#buy-car").on("click", function() {
  event.preventDefault();
  $("#credit-card-box").hide().fadeOut(500);
  $('#manage-money-box').hide().fadeOut(500);
  $('#buy-home-box').hide().fadeOut(500);
  $('#buy-car-box').hide().fadeIn(500);
  $('#invest-box').hide().fadeOut(500);

  $('#buy-car').addClass('box1');
});

$("#invest").on("click", function() {
  event.preventDefault();
  $("#credit-card-box").hide().fadeOut(500);
  $('#manage-money-box').hide().fadeOut(500);
  $('#buy-home-box').hide().fadeOut(500);
  $('#buy-car-box').hide().fadeOut(500);
  $('#invest-box').hide().fadeIn(500);

  $('#invest').addClass('box1');
});