var map;
var markersArray = [];
var geocoder;
var infowindow;
function init() {
  var styles = [
    {
      featureType: 'water',
      stylers: [
        { color: '#f00' }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#ffffff' },
        { weight: 6 }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -40 }
      ]
    },{
      featureType: 'transit.station',
      stylers: [
        { weight: 9 },
        { hue: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        { lightness: 100 }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        { lightness: -100 }
      ]
    },{
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        { visibility: 'on' },
        { color: '#f0e4d3' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -25 }
      ]
    }
  ];


    map = new google.maps.Map(document.getElementById('map'),

        {
            zoom: 13,
          center: { lat: 30.730348, lng: 31.122528 } ,
            styles: styles,
            mapTypeControl: false


        });


    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();

    //setMarkers(markers);
    setMarkers(markers);
    dos(markers);



}


function setAllMap() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].flag === true) {

            markers[i].holdMarker.setMap(map);
        } else {
            markers[i].holdMarker.setMap(null);
        }
    }
}


// These are the real estate listings that will be shown to the user.
// Normally we'd have these in a database instead.

var markers = [
    { title: 'Remass cafee', weather: '', location: { lat: 30.7290489, lng: 31.1220271 }, flag: true, Address: "Elsanta, Tanta, Gharbia,Egypt", id: "nav0", visible: ko.observable(true) },
    { title: 'Zady restaurant', weather: '', location: { lat: 30.7255518, lng: 31.1190958}, flag: true, Address: "Elsanta, Tanta, Gharbia,Egypt", id: "nav1", visible: ko.observable(true) },
    { title: 'Al santa courth', weather: '', location: { lat: 30.7298208, lng: 31.1159243 }, flag: true, Address: "Elsanta, Tanta, Gharbia,Egypt", id: "nav2", visible: ko.observable(true) },
    { title: 'Elsanta Central', weather: '', location: {  lat: 30.7298208, lng:31.1159243}, flag: true, Address: "Elsanta, Tanta, Gharbia,Egypt", id: "nav3", visible: ko.observable(true) },
    { title: 'Pretey Woman', weather: '', location: { lat: 30.7298208, lng: 31.1159243 }, flag: true, Address: "Elsanta, Tanta, Gharbia,Egypt", id: "nav4", visible: ko.observable(true) },
    { title: 'toyata cafee', weather: '', location: { lat: 30.704540, lng: 30.821146 }, Address: "Elsanta, Tanta, Gharbia,Egypt", id: "nav5", flag: true, visible: ko.observable(true) }
];

function dos(markers) {

    for (var i = 0; i < 6; i++) {
        if (markers[i].location !== null) {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?lat=" + markers[i].location.lat + "&lon=" + markers[i].location.lng + "&units=metric&appid=b73fdf613d6cd9742333f7034583b1f2",
                type: "GET",
                dataType: "jsonp",
                success: show,
                error: errors,
                async: true
            });

        }
        else {
            alert('error in location');
        }

    }
    function time() {
        alert("Failed to load openweathermap");
    }
}
var errors = function (data) {
    window.alert('Error was: ' + data.status);
};
var show = function (data) {
    des(data, markers);
};
function des(data, markers) {
    for (var i = 0; i < 6; i++) {
        var y = data.weather[0].description;
        markers[i].weather = y;

    }

    cMarkers(markers);
    //setAllMap();

}
var toggleBounce;
// set marker to their locations
function setMarkers(location) {

    for (i = 0; i < location.length; i++) {
        var position = markers[i].location;

        location[i].holdMarker = new google.maps.Marker({
            position: position,
            map: map,
            title: location[i].title,
            draggable: true,
            animation: google.maps.Animation.DROP

        });
    }
}
function cMarkers(location) {

    for (i = 0; i < location.length; i++) {

        location[i].holdMarker.addListener('click', toggleBounce(location[i].holdMarker, i));
        location[i].contentString = '<strong>' + location[i].title + '</strong><br>' + location[i].Address + '<br>' + location[i].weather;
        infowindow.setContent(location[i].contentString);

        new google.maps.event.addListener(location[i].holdMarker, 'click', setcont(location[i].holdMarker, i));
    }





    function setcont(marker, i) {
        return function () {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map, this);
        };
    }

    function toggleBounce(marker, i) {

        return function () {
            console.log('v');
            infowindow.setContent(location[i].contentString);
            infowindow.open(map, marker);
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            for (var x = 0; x <= 5; x++) {
                location[x].holdMarker.setAnimation(null);
                location[x].holdMarker.setIcon(null);
            }
            if (location[i].holdMarker.getAnimation() !== null) {
                location[x].holdMarker.setAnimation(null);
            } else {
                location[i].holdMarker.setAnimation(google.maps.Animation.BOUNCE);
            }
        };
    }

}
function animat(i, marker) {
    var position = marker.location;

    marker.holdMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
        marker.holdMarker.setAnimation(null);
    }, 1000);
    contentString = '<strong>' + marker.title + '</strong><br>' + marker.Address + '<br>' + marker.weather;
    infowindow.setContent(contentString);
    infowindow.open(map, marker.holdMarker);

}
// our viewModel
var viewModel = {
    question: ko.observable(''),
    set: setAllMap,
    address: ko.observable(''),
    codeAddress: function () {
        var address = this.address();
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    },
    itemClicked: animat

};

viewModel.markers = ko.computed(function () {
    var self = this;
    var search = self.question().toLowerCase();
    return ko.utils.arrayFilter(markers, function (marker) {

        if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.flag = true;
            return marker.visible(true);

        } else {
            marker.flag = false;
            setAllMap();

            return marker.visible(false);
        }

    });
}, viewModel);

ko.applyBindings(viewModel);

function mapError() {
    alert('could not load the map see error msg');
}
