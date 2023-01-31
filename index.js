var header = document.getElementById('jspeaker');

$(window).scroll(function(){
    $(".center").css("opacity", 1 - $(window).scrollTop() / 250);
  });