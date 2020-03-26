var blnHeaderIsScreenLabel = true;


$(window).on('load', function() {
  handleHeaders();
  displayHeaderAsScreenLabel();
  $('.screen-label').text($('.screen-label').text().replace("HEADER_", ""));
});

$(document).on('click', '#progress-bar .steps .steps-text p', function () {
  document.cookie = "screen=" + $('.navpanel a:contains(' + $(this).text() + ')');
  displayHeaderAsScreenLabel();
});
$(document).on('click', '#dtc .navpanel .navpanel__item', function () {
  document.cookie = "screen=" + $(this).text();
  displayHeaderAsScreenLabel();
});
$(document).on('click', '#dtc .field-button', function () {
  document.cookie = "screen=" + $('#dtc div.navpanel > div.navpanel__aligntop > div > a.navpanel__item.list-group-item.active + a').text();
    displayHeaderAsScreenLabel();
});
/*$(window).resize(function() {
  handleHeaders();
  displayHeaderAsScreenLabel();
});*/


function displayHeaderAsScreenLabel() {
  var count = 0;    
  $(document).on('DOMSubtreeModified', '#dtc', function() {
    if (count < 1) {
      count++;
      var screen = getCookie("screen");
        var header = '';
        if (isHeader($('#dtc div.navpanel > div.navpanel__aligntop > div > a.navpanel__item.list-group-item:contains(' + screen + ')'))) {
            header = $('#dtc div.navpanel > div.navpanel__aligntop > div > a.navpanel__item.list-group-item:contains(' + screen + ')').text();
        } else {
            $('#dtc div.navpanel > div.navpanel__aligntop > div > a.navpanel__item.list-group-item:contains(' + screen + ')').prevAll().each(function () {
                if (isHeader($(this))) {
                    header = $(this).text();
                    return false;
                }
            });
        }        
      if (blnHeaderIsScreenLabel) {
        $('#dtc .screen-label').text(header)         
      }
    }
  });
}

function handleHeaders() {
$('.navpanel__item:contains(HEADER_)').each(function () {
    if (!$(this).text().includes("HEADER_"))
        return;

    var text = $(this).text();
    $(this).attr("id", text);

    var html = $(this).html();
    html = html.replace("HEADER_", "");
    $(this).html(html);
    $(this).children().css("display", "none");
  });
  $(".navpanel__item[id*='HEADER_']").each(function() {
    $(this).addClass("navpanel__header");
    $(this).removeClass("navpanel__item_pending");
  });
}

function isHeader(step) {
  if (step[0].hasAttribute("id") && step.attr("id").includes("HEADER_") || step.text().includes("HEADER_"))
    return true;
  return false;
}
