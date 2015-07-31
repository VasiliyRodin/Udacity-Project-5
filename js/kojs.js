var tacoPlaces = [
    {
        name: "Tacos Negris",
        street: "37721 Niles Blvd",
        city: "Fremont",
        state: "CA",
        lat: 37.576258,
        long: -121.976626
    },
    {
        name: "Tacos La Perla",
        street: "41080 Trimboli Way",
        city: "Fremont",
        state: "CA",
        lat: 37.531579,
        long: -121.960496
    },
    {
        name: "Los Cabos",
        street: "3283 Walnut Ave",
        city: "Fremont",
        state: "CA",
        lat: 37.550253,
        long: -121.980229
    },
    {
        name: "Casa De Meza",
        street: "4949 Stevenson Blvd",
        city: "Fremont",
        state: "CA",
        lat: 37.529590,
        long: -121.982879
    },
    {
        name: "Tacos El Compadre",
        street: "4149 Peralta Blvd",
        city: "Fremont",
        state: "CA",
        lat: 37.556985,
        long: -122.008457
    },
    {
        name: " Super Taco",
        street: "40798 Fremont Blvd",
        city: "Fremont",
        state: "CA",
        lat: 37.534687,
        long: -121.962361
    }
];
//GoogleMaps API
function initialize() {
    var mapOptions = {
        center: {lat: 37.5483333, lng: -121.9875},
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

    for (tacoPlace in tacoPlaces) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(tacoPlace.lat, tacoPlace.long),
            map: map
        });
        marker.setMap(map);
    }

}

google.maps.event.addDomListener(window, 'load', initialize);

var viewModel = {
    query: ko.observable('')
};
viewModel.tacoPlaces = ko.dependentObservable(function () {
    var search = this.query().toLowerCase();
    return ko.utils.arrayFilter(tacoPlaces, function (tacoPlace) {
        return tacoPlace.name.toLowerCase().indexOf(search) >= 0;
        console.log("go away.");
    });
}, viewModel);
ko.applyBindings(viewModel);
