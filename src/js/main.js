import { log, loadMapData } from './modules';
import { initMapOverlays, initMap } from './map';
import axios from 'axios';

// Handler when the DOM is fully loaded
const load = () => {

  axios.get('http://localhost:5000/maps/')
  .then(response => {
    initMapOverlays();
    initMap(response.data);
  })
  .catch((error) => {
    console.log(error);
  })
}

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
  load();
} else {
  document.addEventListener("DOMContentLoaded", load);
}
