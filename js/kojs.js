/*
 *  Vasiliy Rodin
 *  Project 5 
 */

function ViewModel() {
    var self = this;
    self.query = ko.observable("");
    self.tacoPlaces = [
        {
            name: "Tacos Negris",
            street: "37721 Niles Blvd",
            city: "Fremont",
            state: "CA",
            lat: 37.576258,
            long: -121.976626,
            marker: null
        },
        {
            name: "Tacos La Perla",
            street: "41080 Trimboli Way",
            city: "Fremont",
            state: "CA",
            lat: 37.531579,
            long: -121.960496,
            marker: null
        },
        {
            name: "Los Cabos",
            street: "3283 Walnut Ave",
            city: "Fremont",
            state: "CA",
            lat: 37.550253,
            long: -121.980229,
            marker: null
        },
        {
            name: "Casa De Meza",
            street: "4949 Stevenson Blvd",
            city: "Fremont",
            state: "CA",
            lat: 37.529590,
            long: -121.982879,
            marker: null
        },
        {
            name: "Tacos El Compadre",
            street: "4149 Peralta Blvd",
            city: "Fremont",
            state: "CA",
            lat: 37.556985,
            long: -122.008457,
            marker: null
        },
        {
            name: " Super Taco",
            street: "40798 Fremont Blvd",
            city: "Fremont",
            state: "CA",
            lat: 37.534687,
            long: -121.962361,
            marker: null
        }
    ];
    
    var map;
    self.tacoPlace = ko.observableArray(self.tacoPlaces);
    //animates marker and launches the infoWindow when clicked from the list
    self.animateMarker = function (item) {
        if (item.marker.getAnimation() !== null) {
            item.marker.setAnimation(null);
        } else {
            item.marker.setAnimation(google.maps.Animation.BOUNCE);
            generateContentString(item, map);
        }
    };
    /*
     * Google map API initialize.
     */
    function initialize() {
        var mapOptions = {
            center: {lat: 37.5483333, lng: -121.9875},
            zoom: 12
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        self.markerArray = [];
        //Creates the marker for each item in the tacoPlace() array.
        var tacoPlaceLength = self.tacoPlace().length;
        for (var i = 0; i < tacoPlaceLength; i++) {
            var tacoPlace = self.tacoPlace()[i];
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(tacoPlace.lat, tacoPlace.long),
                title: tacoPlace.name
            });
            // Declares the info window for each taco place.
            tacoPlace.infoWindow = new google.maps.InfoWindow({
                content: content
            });
            var content = "";
            //Each marker is placed into array for later use.
            self.markerArray.push(marker);
            tacoPlace.marker = marker;
        }
        //Goes through the marker array and it shows on the map.
        for (var i = 0; i < self.markerArray.length; i++) {
            self.markerArray[i].setMap(map);
        }
        //Adds onClick listener for each marker. 
        self.tacoPlace().forEach(function (item) {
            google.maps.event.addListener(item.marker, 'click', function () {
                //Sends each item(tacoPlace) to generateContentString with all its info
                generateContentString(item, map);
            });
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);

// Compares what you typed in the search bar and shows you the results in the list and shows marker for the specific ones in the list.
    self.computedTacoPlaces = ko.computed(function () {
        return ko.utils.arrayFilter(self.tacoPlace(), function (item) {
            var showItem = item.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
            if (item.marker) {
                if (showItem) {
                    item.marker.setMap(map);
                } else {
                    item.marker.setMap(null);
                }
            }
            return showItem;
        });
    });
}
ko.applyBindings(new ViewModel());


//generates the content for the info window using yelp API.
var generateContentString = function (item, map) {
    var restaurantName = item.name;
    var restaurantCity = item.city;

    var consumerKey = "2oYHSfCHwQ6kkjBpcCL1fA";
    var consumerKeySecret = "9Oy6r-k0gjPU7xhX7XKr01rGv-8";
    var token = "BfJfpUb91qbdylAQsd3I1_YNpztoxwFs";
    var tokenSecret = "nQAgIPhyzkVVG7XfnE05waNiNE8";

    /*
     * Get yelp Info about taco places
     */
    function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
    }

    var yelp_url = "http://api.yelp.com/v2/search/";

    var parameters = {
        oauth_consumer_key: consumerKey,
        oauth_token: token,
        oauth_nonce: nonce_generate(),
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        callback: 'cb',
        term: restaurantName,
        location: restaurantCity,
        limit: 1

    };

    var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, consumerKeySecret, tokenSecret);
    parameters.oauth_signature = encodedSignature;

    var settings = {
        url: yelp_url,
        data: parameters,
        cache: true,
        dataType: 'jsonp',
        success: function (results) {
            // Creates the content string that is then returned to the info window.
            var contentString = '<div id="content">' +
                    '<h1>' + results.businesses[0].name + '</h1>' +
                    '<h3> Rating: <img src="' + results.businesses[0].rating_img_url + '"</h3>' +
                    '<h3> Phone: ' + results.businesses[0].phone + '</h3>' +
                    '<h3> Address: ' + results.businesses[0].location.display_address + '</h3>' +
                    '</div>';
            item.infoWindow.setContent(contentString);
            item.infoWindow.open(map, item.marker);
        },
        error: function () {
            console.log("doesnt work");
        }
    };
    $.ajax(settings);
};
