var blnHeaderIsScreenLabel = true;


$(window).on('load', function() {
  handleHeaders();
  displayHeaderAsScreenLabel();
  $('.screen-label').text($('.screen-label').text().replace("HEADER_", ""));
});

$(document).on('click', '#progress-bar .steps .steps-text p', function() {
  displayHeaderAsScreenLabel();
});
$(document).on('click', '#sdk-runtime .navpanel .navpanel__item', function() {
  displayHeaderAsScreenLabel();
});
$(document).on('click', '#sdk-runtime .field-button', function() {
  displayHeaderAsScreenLabel();
});
$(window).resize(function() {
  handleHeaders();
  displayHeaderAsScreenLabel();
});


function displayHeaderAsScreenLabel() {
  var count = 0;
  $(document).on('DOMSubtreeModified', '#sdk-runtime', function() {
    if (count < 1) {
      count = 1;
      var header = '';
      if (blnHeaderIsScreenLabel) {
        if (isHeader($('#sdk-runtime > div > div > nav > div > div.navpanel__aligntop > div > a.navpanel__item.list-group-item.active'))) {
          header = $('#sdk-runtime > div > div > nav > div > div.navpanel__aligntop > div > a.navpanel__item.list-group-item.active').text();
        } else {
          $('#sdk-runtime > div > div > nav > div > div.navpanel__aligntop > div > a.navpanel__item.list-group-item.active').prevAll().each(function() {
            if (isHeader($(this))) {
              header = $(this).text();
              return false;
            }
          });
        }
        $('#sdk-runtime .screen-label').text(header)
      }
    }
  });
}

function handleHeaders() {
  $('.navpanel__item:contains(HEADER_)').each(function() {
    var text = $(this).text();
    $(this).attr("id", text);

    var html = $(this).html();
    html = html.replace("HEADER_", "");

    $(this).html(html);

    $(this).children().css("display", "none");
  });
}

function isHeader(step) {
  if (step[0].hasAttribute("id") && step.attr("id").includes("HEADER_") || step.text().includes("HEADER_"))
    return true;
  return false;
}
