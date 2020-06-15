$(document).ready(function(){
    $('#hlavicka').load('./komponenty/hlavicka.html');
});

$(document).ready(function(){
    $('#paticka').load('./komponenty/paticka.html');
});

// create the map
var mymap = L.map('mapid', {
    center: [-0.0, -0.0],
    zoom: 4
});

// create the image
var imageUrl = './svg/mapa.svg',
    imageBounds = [[-27.098, -45.0], [27.098, 45.0]];

L.imageOverlay(imageUrl, imageBounds).addTo(mymap);

//L.rectangle(imageBounds).addTo(mymap);

$(document).ready(function(){
    $.getJSON('./data.json', function( data ) {
        $.each(data, function (i, item) {
            L.marker([data[i].lat, data[i].lon]).addTo(mymap).bindTooltip("<b>" + data[i].mesto + "</b>, " + data[i].stat).on("click", function(event) {
                $('#infobox').collapse("show");
                $('#mesto').text(data[i].mesto);
                $('#stat').text(data[i].stat);
                $('#popisek').text(data[i].popisek);
                $('#wikimesta').attr("href", data[i].wikimesta);
                $('#wikistatu').attr("href", data[i].wikistatu);
            })
        });
    });
});

// mymap.on("contextmenu", function (event) {
//   alert("Coordinates: " + event.latlng.toString());
//   L.marker(event.latlng).addTo(mymap);
// });
