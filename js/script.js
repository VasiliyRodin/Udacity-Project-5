
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $yelpElem = $('#yelp-header');
    var $yelpArtic = $('#yelp-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $yelpArtic.text("");


    var stateStr = $('#state').val();
    var cityStr = $('#city').val();
    var yelpAddress = stateStr + ", " + cityStr;


    /*
     * Get yelp Info about tacos
     */

    function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
    }
    // Search for the top 10 highest rated tacos
    var yelp_url = "http://api.yelp.com/v2/search";//"&sort2&limit=10";

    var parameters = {
        oauth_consumer_key: "2oYHSfCHwQ6kkjBpcCL1fA",
        oauth_token: "t6XJBkMTk06VK86Ef-BACPDJ-sXEngnj",
        oauth_nonce: nonce_generate(),
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        callback: 'cb',
        location : yelpAddress,
        term : "tacos",
        limit: "1"
    };
    
    var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters,"9Oy6r-k0gjPU7xhX7XKr01rGv-8","7LHXDy-s0D7_CxJNeGY20Pd0HnQ");
    parameters.oauth_signature = encodedSignature;
    var settings = {
        url: yelp_url,
        data: parameters,
        cache: true,
        dataType: 'jsonp',
        success: function(results) {
            console.log(results);
        },
        error: function() {
            //do stuff
        }
        
    };
    $.ajax(settings);








    /*
     var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
     $body.append('<img class="bgimg" src="' + streetViewURL + '">');
     */
    /*
     * 
     * GOOGLE Street View API
     */
    /*
     var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
     $body.append('<img class="bgimg" src="' + streetViewURL + '">');
     */
    /*
     * NYT API
     * getting NYT articles about the location
     */

    /*
     var apiKey = 'ac6f2aef5c84e42d6dd6b4e0f3dc8d4d:10:72368550';
     var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=' + apiKey;
     
     $.getJSON(nyTimesURL, function (data) {
     $nytHeaderElem.text('New York Times Articles About ' + cityStr);
     articles = data.response.docs;
     for (var i = 0; i < articles.length; i++) {
     var article = articles[i];
     $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '<p>' + '</li>');
     }
     ;
     }).error(function () {
     $nytHeaderElem.text('ERRRRRROOOOORRRR');
     });
     */

    /*
     * WIKIPEDIA Api
     */
    /*   var wikiRequestTimeOut = setTimeout(function(){
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
     */

    return false;
}
;

$('#form-container').submit(loadData);

// loadData();
