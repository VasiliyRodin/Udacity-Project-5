
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $yelpElem = $('#yelp-header');
    var $nytElem = $('#yelp-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var stateStr = $('#state').val();
    var cityStr = $('#city').val();
    /*
     var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
     $body.append('<img class="bgimg" src="' + streetViewURL + '">');
     */
    // Getting Yelp Info about Tacos



    return false;
}
;

$('#form-container').submit(loadData);

// loadData();
