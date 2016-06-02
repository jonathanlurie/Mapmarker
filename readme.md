# Mapmarker

Mapmarker is a simple map project to display a circle marker at the center of a map, using URL hash to give GPS coordinates. It uses [MapboxGL](https://www.mapbox.com/maps/) to render maps using WebGL.  

Mapmarker comes with several kind of maps:
- bright.html
- dark.html
- light.html
- satellite.html
- hybrid.html
- outdoors.html
- streets.html

For each style, you can customize the URL to mark a specific location:  
```
http://yourdomain.com/mapmarker/streets.html#14/47.9421/-70.4758
```

## The hash
The Hash is composed of 3 elements:
- zoom level, from 0 to 20, decimal allowed
- the latitude, from -85 to 85
- the longitude, from -180 to 180

## License
MIT
