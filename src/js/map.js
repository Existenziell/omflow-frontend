import { loadMapData } from './modules';

const accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
let map = {},
  geocoder = {},
  geolocate = {},
  mapdata = loadMapData();

const initMapOverlays = () => {
  $('.close-overlay').on('click', () => {
    $("#overlay").fadeOut();
    return false;
  });
}

const initMap = () => {
  mapboxgl.accessToken = accessToken;
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9', // satellite-v9 / light-v10 / dark-v10 / outdoors-v11 / streets-11
    center: [20, 15],
    zoom: 1.8
  });

  map.on('load', function () {

    map.addSource('places', {
      type: 'geojson',
      data: 'http://localhost:5000/maps',     // Point to GeoJSON data.
      cluster: true,      // set the 'cluster' option to true. GL-JS will add the point_count property to your source data.
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50   // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'places',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#237a9a',
        'circle-radius': 20,
        'circle-opacity': .8
      }
    });

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'places',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-size': 14
      }
    });

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'places',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#237a9a',
        'circle-radius': 10,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#ddd',
        'circle-opacity': .8
      }
    });

    map.on('click', 'clusters', function (e) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      const clusterId = features[0].properties.cluster_id;
      map.getSource('places').getClusterExpansionZoom(
        clusterId, (err, zoom) => {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
            essential: true
          });
        }
      );
    });

    map.on('click', 'unclustered-point', function (e) {
      let coordinates = e.features[0].geometry.coordinates.slice();
      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      let html = createMarkerHtml(e.features[0]);
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(map);

      map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: e.features[0].geometry.coordinates,
        // zoom: 9,
        // bearing: 0,
        speed: 0.2, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
          return t;
        },
        // this animation is considered essential with respect to prefers-reduced-motion
        essential: true
      });
    });

    map.on('mouseenter', 'clusters', function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseenter', 'unclustered-point', function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
      map.getCanvas().style.cursor = '';
    });
    map.on('mouseleave', 'unclustered-point', function () {
      map.getCanvas().style.cursor = '';
    });
  });

  createGeo();
}


// Use custom Geocoder to include the features in map.json
const forwardGeocoder = (query) => {

  // const mapdata = await loadMapData();
  console.log('forward...');
  console.log(mapdata);

  let matchingFeatures = [];
  for (let i = 0; i < mapdata.features.length; i++) {
    let feature = mapdata.features[i];
    if (feature.id.toLowerCase().search(query.toLowerCase()) !== -1) {
      feature['center'] = feature.geometry.coordinates;
      feature['place_name'] = '🙏 ' + feature.id;
      matchingFeatures.push(feature);
    }
  }
  return matchingFeatures;
}

const createGeo = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  // Add the geocoder to the map
  geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    localGeocoder: forwardGeocoder,
    marker: false,
    zoom: 5,
    placeholder: 'Search event / location',
    mapboxgl: mapboxgl,
    limit: 20
  });

  // Add geolocate control to the map.
  geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });

  // Add search bar and geolocate button
  map.addControl(geocoder);
  map.addControl(geolocate);

  // Open corresponding popup if result is clicked
  geocoder.on('result', function (e) {
    // Close all open popups
    $(".mapboxgl-popup").remove();

    // Create new poppup only if own result
    if (e.result.properties.name) {

      let html = createMarkerHtml(e.result);
      let coords = e.result.geometry.coordinates;
      let popup = new mapboxgl.Popup({ offset: 15 })
        .setLngLat(coords)
        .setHTML(html)
        .addTo(map);
    }
  });

  // Clear value of search input
  document.querySelector('.mapboxgl-ctrl-geocoder--input').onclick = (e) => {
    e.target.value = '';
  }
}



const createMarkerHtml = data => {
  const { name, image, video, description, classes } = data.properties;

  return `
        <div class='popup'>
            <h1>${name}</h1>
            <div class='popup-img-${image}'></div>
            <div class='embed-container embed-container-cb'>${video}</div>
            <img src='src/img/teachers/${image}' />
            <p>${description}</p>
            <ul>${classes}</ul>
        </div>
    `;
}

const destroyGeo = () => {
  map.removeControl(geolocate);
  map.removeControl(geocoder);
}

export { initMapOverlays, initMap }

