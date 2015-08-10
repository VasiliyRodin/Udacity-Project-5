function ViewModel() {
    self = this;
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

    //GoogleMaps API

    var map;
    self.tacoPlace = ko.observableArray(self.tacoPlaces);
    function initialize() {
        var mapOptions = {
            center: {lat: 37.5483333, lng: -121.9875},
            zoom: 12,
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // Info Window content
        var contentString = '<div id="content">' +
                '<h1>' + self.name + '</h1>' +
                '</div>';

        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        self.markerArray = [];
        //Creates the marker.
        for (var i = 0; i < self.tacoPlace().length; i++) {
            tacoPlace = self.tacoPlace()[i];
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(tacoPlace.lat, tacoPlace.long),
                title: tacoPlace.name
            });
            self.markerArray.push(marker);
            tacoPlace.marker = marker;
        }
        //shows Marker
        for (var i = 0; i < self.markerArray.length; i++) {
            self.markerArray[i].setMap(map);
        }
        //Shows the info window on click.
        google.maps.event.addListener(marker, 'click', function () {infoWindow.open(map, marker);
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













;