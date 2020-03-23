$(window).on('load', function () {
  //$('.screen-label:contains(HEADER_)').each(function() {
  //  alert("screenlabel");
  //  var text = $(this).text();
  //  text = text.replace("HEADER_", "");
  //  $(this).text(text);
  //});

  //fixHeaders();

  $(document).on('DOMSubtreeModified', '#dtc', function() {
    var sideHeight = $('#sidebar').css('height');
    var sdkHeight = $('#dtc .runtime-container__screen').css('height');
    if (parseInt(sdkHeight) < 715) {
      $('#sidebar').css('height', '715px');
    } else {
      $('#sidebar').css('height', sdkHeight);
    }
    //fixHeaders();
  });
});


$(window).resize(function() {
  //fixHeaders();
});



$(document).on('submit', '#dtc > div > div > main > div > div > form', function() {
  alert('tree');
});

//function fixHeaders() {
  //$('.navpanel__item:contains(HEADER_)').each(function() {
    //var text = $(this).text();
    //$(this).attr("id", text);

    //var html = $(this).html();
    //html = html.replace("HEADER_", "");

    //$(this).html(html);

    //$(this).children().css("display", "none");
  //});
//}
