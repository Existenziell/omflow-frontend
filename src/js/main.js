import { log } from './modules';
import { initMapOverlays, initMap } from './map';

// Handler when the DOM is fully loaded
const callback = () => {
    initMapOverlays();
    initMap();
}

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
