
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

<<<<<<< HEAD

    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetViewURL + '">');

    // YOUR CODE GOES HERE!
    // getting NYT articles about the location

    var apiKey = 'ac6f2aef5c84e42d6dd6b4e0f3dc8d4d:10:72368550';
    var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=' + apiKey;

    $.getJSON(nyTimesURL, function (data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i <articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+ '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '<p>' + '</li>');
        };
    }).error(function(){
        $nytHeaderElem.text('ERRRRRROOOOORRRR');
    });
=======

>>>>>>> origin/master

    var wikiRequestTimeOut = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");}, 8000
    );

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallBack';
    //Sends the request to WIkipedia 
    $.ajax({
        url : wikiUrl,
        dataType : "jsonp",
        success: function ( response) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="'+ url + '">' + articleStr + '<a></li?>');
            };
        }
    });


    return false;
}
;

$('#form-container').submit(loadData);

// loadData();
