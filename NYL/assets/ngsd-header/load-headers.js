var blnHeaderIsScreenLabel = true;

$(window).on('load', function() {
  handleHeaders();
});

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
