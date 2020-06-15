$(document).ready(function(){
    $('#hlavicka').load('./komponenty/hlavicka.html');
});

$(document).ready(function(){
    $('#paticka').load('./komponenty/paticka.html');
});

// create the map
let mymap = L.map('mapid', {
    center: [-0.0, -0.0],
    zoom: 4
});

let greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// create the image
let imageUrl = './svg/mapa.svg',
    imageBounds = [[-27.098, -45.0], [27.098, 45.0]];

L.imageOverlay(imageUrl, imageBounds).addTo(mymap);

//L.rectangle(imageBounds).addTo(mymap);

let mesta = L.layerGroup([]).addTo(mymap);
let unesco = L.layerGroup([]).addTo(mymap);

$(document).ready(function(){
    $.getJSON('./json/mesta.json', function( data ) {
        $.each(data, function (i, item) {
            L.marker([data[i].lat, data[i].lon]).addTo(mymap).addTo(mesta).bindTooltip("<b>" + data[i].mesto + "</b>, " + data[i].stat).on("click", function(event) {
                $('#infobox').collapse("show");

                $('#mesto').text(data[i].mesto);
                $('#stat').text(data[i].stat);
                $('#popisek').text(data[i].popisek);
                $('#wiki').attr("href", data[i].wikimesta);
            })
        });
    });
});

$(document).ready(function(){
    $.getJSON('./json/unesco.json', function( data ) {
        $.each(data, function (i, item) {
            L.marker([data[i].lat, data[i].lon], {icon: greenIcon}).addTo(mymap).addTo(unesco).bindTooltip("<b>" + data[i].pamatka + "</b>, " + data[i].stat).on("click", function(event) {
                $('#infobox').collapse("show");
                $('#mesto').text(data[i].pamatka);
                $('#stat').text(data[i].stat);
                $('#popisek').text(data[i].popisek);
                $('#wiki').attr("href", data[i].wiki);
            })
        });
    });
});

let vrstvy = {
    "Města": mesta,
    "Unesco památky": unesco
};

L.control.layers(null, vrstvy).addTo(mymap);
