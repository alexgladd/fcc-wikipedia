/*
 * Wikipedia viewer Javascript
 *
 * https://www.mediawiki.org/wiki/API:Main_page
 */

// globals ------------------------------------------------

var wikiApiUri = "https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&utf8=&srlimit=9&srsearch="

// jQuery start -------------------------------------------

$(document).ready(function() {
  // search input
  $("#wsearch-input").on("input", onInputChange);
  // search btn
  $("#wsearch-btn").on("click", onSearch);
});

// events -------------------------------------------------

function onInputChange() {
  var searchTxt = $("#wsearch-input").val().trim();

  if (searchTxt) {
    $("#wsearch-btn").prop("disabled", false);
  } else {
    $("#wsearch-btn").prop("disabled", true);
  }
}

function onSearch() {
  var searchTxt = $("#wsearch-input").val().trim();

  if (searchTxt) {
    var uri = encodeURI(wikiApiUri + searchTxt);
    console.log(uri);
    $.getJSON(uri, onSearchResults);
  }
}

function onSearchResults(results) {
  console.log(results);
}
