mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//   container: 'map', // container ID
//   style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
//   center: result.geometry.coordinates, // starting position [lng, lat]
//   zoom: 14, // starting zoom
// });

const map = new mapboxgl.Map({
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/standard',
  center: result.geometry.coordinates,
  zoom: 14,
  pitch: 45,
  bearing: -17.6,
  container: 'map',
  antialias: true
});

map.addControl(new mapboxgl.NavigationControl());

map.on('style.load', () => {
  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
      (layer) => layer.type === 'symbol' && layer.layout['text-field']
  ).id;

  // The 'building' layer in the Mapbox Streets
  // vector tileset contains building height data
  // from OpenStreetMap.
  map.addLayer(
      {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
              'fill-extrusion-color': '#aaa',

              // Use an 'interpolate' expression to
              // add a smooth transition effect to
              // the buildings as the user zooms in.
              'fill-extrusion-height': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'height']
              ],
              'fill-extrusion-base': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
          }
      },
      labelLayerId
  );
});



new mapboxgl.Marker()
    .setLngLat(result.geometry.coordinates)
    .setPopup(
          new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                   `<h5> ${result.title}  </h5>`
                  )
    )
    .addTo(map)

