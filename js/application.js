/*
 * Wikipedia viewer Javascript
 *
 * https://www.mediawiki.org/wiki/API:Main_page
 */

// globals ------------------------------------------------

var wikiApiUri = "https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&utf8=&srlimit=9&srsearch=";
var wikiLinkUri = "https://en.wikipedia.org/wiki/";

var curResults;
var curResultIndex;

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
    // clear existing results
    $("#wsearch-results > .row").html("");
    curResults = [];
    curResultIndex = 0;

    // fire api request
    var uri = encodeURI(wikiApiUri + searchTxt);
    console.log(uri);
    $.getJSON(uri, onSearchResults);
  }
}

function onSearchResults(results) {
  console.log(results);

  if (results.query.search && results.query.search.length > 0) {
    curResults = results.query.search;
    renderNextSearchResult();
  }

  // for (var i = 0; i < results.query.search.length; i++) {
  //   var sresult = results.query.search[i];
  //   console.log(sresult);
  //
  //   $("#wsearch-results > .row").append(createSearchResult(sresult.title, sresult.snippet, i));
  // }
}

function renderNextSearchResult() {
  var sresult = curResults[curResultIndex];
  console.log(sresult);

  $("#wsearch-results > .row").append(createSearchResult(sresult.title, sresult.snippet, curResultIndex));

  // set timer for next render
  curResultIndex++;

  if (curResultIndex < curResults.length) {
    setTimeout(renderNextSearchResult, 333);
  }
}

function createSearchResult(title, snippet, index) {
  var $result = $("<div></div>").addClass("col-xs-12 col-sm-6 col-md-4");
  var $link = $("<a></a>")
    .attr("href", encodeURI(wikiLinkUri + title))
    .attr("target", "_blank")
    .addClass("wsearch-result");

  var cardClass = (index % 2 == 0) ? "wsearch-result-a" : "wsearch-result-b";
  var $resultCard = $("<div></div>").addClass(cardClass);
  $resultCard.append(
    $("<h3></h3>").html(title)
  );
  $resultCard.append(
    $("<p></p>").html(snippet)
  );

  $link.append($resultCard);
  $result.append($link);

  // console.log($result);

  return $result;
}
