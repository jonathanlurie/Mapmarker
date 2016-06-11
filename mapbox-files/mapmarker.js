var tooltip = new mapboxgl.Popup({closeOnClick: false});

function loadMap(mapboxOption) {
    'use strict';


    if ( mapboxgl.supported() ) {
        renderMapboxGL(mapboxOption);
    } else {
        console.log("MapboxGL not supported on this browser.");
    }

    function renderMapboxGL(options) {
        mapboxgl.accessToken = options.token;
        mapboxgl.config.API_URL = 'https://api.mapbox.com';
        window.map = new mapboxgl.Map({
            container: 'map',
            style: options.style,
            hash: true,
            scrollZoom: true
        }).addControl(new mapboxgl.Navigation({position: 'top-left'}));

        var center = window.map.getCenter();



        map.on('load', function () {

            map.addSource("markers", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [center.lng, center.lat]
                        },
                        "properties": {
                            "title": "Here",
                            "marker-symbol": "marker"
                        }
                    }]
                }
            });


            map.addLayer({
                "id": "markers-circles-out",
                "type": "circle",
                "source": "markers",
                "paint": {
                    "circle-color": "#ffffff",
                    "circle-radius": 15,
                    "circle-opacity": 1
                }

            });

            map.addLayer({
                "id": "markers-circles",
                "type": "circle",
                "source": "markers",
                "paint": {
                    "circle-color": options.dotColor,
                    "circle-radius": 12,
                    "circle-opacity": 1
                }

            });

        });



        map.on('mouseup', function (e) {

            // Secondary button
            if(e.originalEvent.button == 2){

                tooltip.setLngLat(e.lngLat)
                    .setLngLat(e.lngLat)
                    .setHTML('<h1 id="popuplink">Go there!</h1>')
                    .addTo(map);

                $( "#popuplink" ).click(function() {

                    map.flyTo({
                        center: [ e.lngLat.lng, e.lngLat.lat]
                    });

                    tooltip.remove();
                    var markerSource = map.getSource("markers");

                    var newMarkerData = {
                            "type": "FeatureCollection",
                            "features": [{
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [e.lngLat.lng, e.lngLat.lat]
                                },
                                "properties": {
                                    "title": "Here",
                                    "marker-symbol": "marker"
                                }
                            }]
                        };

                    markerSource.setData(newMarkerData);

                });

                $( "#popuplink" ).css("color", options.dotColor);

            }


        });

    }


}
