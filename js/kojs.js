var tacoPlaces = [
    {name: "Tacos Negris", street: "37721 Niles Blvd", city: "Fremont", state: "CA"},
    {name: "Tacos La Perla", street: "41080 Trimboli Way", city: "Fremont", state: "CA"},
    {name: "Los Cabos", street: "3283 Walnut Ave", city: "Fremont", state: "CA"},
    {name: "Casa De Meza", street: "4949 Stevenson Blvd", city: "Fremont", state: "CA"},
    {name: "Tacos El Compadre", street: "4149 Peralta Blvd", city: "Fremont", state: "CA"},
    {name: " Super Taco", street: "40798 Fremont Blvd", city: "Fremont", state: "CA"}
];

var viewModel = {
    query: ko.observable('')
};

viewModel.tacoPlaces = ko.dependentObservable(function () {
    var search = this.query().toLowerCase();
    return ko.utils.arrayFilter(tacoPlaces, function (tacoPlace) {
        return tacoPlace.name.toLowerCase().indexOf(search) >= 0;
    });
}, viewModel);

ko.applyBindings(viewModel);

//GoogleMaps API
function initialize() {
    var mapOptions = {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);