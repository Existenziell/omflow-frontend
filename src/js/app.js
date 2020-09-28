import { loadMapData } from './modules';

import Home from "../views/Home.js";
import Map from "../views/Map.js";
import Teacher from "../views/Teacher.js";
import Teachers from "../views/Teachers.js";
import Class from "../views/Class.js";
import Classes from "../views/Classes.js";
import MatchMe from "../views/MatchMe.js";
import Dashboard from "../views/Dashboard.js";

import { initForm } from './../js/matchme';
import { initMap, initMapOverlays } from './../js/map';

const pathToRegex = path =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]];
  }));
};

// Use history API
const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Home, id: 'home' },
    { path: "/map", view: Map, id: 'map' },
    { path: "/teachers", view: Teachers },
    { path: "/teachers/:id", view: Teacher },
    { path: "/classes", view: Classes },
    { path: "/classes/:id", view: Class },
    { path: "/matchme", view: MatchMe, id: 'matchme' },
    { path: "/dashboard", view: Dashboard, id: 'dashboard' },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  // Catch unmatched url // Redirect to first route (Home)
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }

  // Create new instance of the view at matched route
  const view = new match.route.view(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();

  if (match.route.id === 'matchme') initForm();
  if (match.route.id === 'map') {
    initMapOverlays();
    initMap();
  }
};

// Run router if user navigates in browser
window.addEventListener("popstate", router);

// Fetch all clicks on data-links // prevent page reload // Let router handle the navigation
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  // Initiate router when DOMContentLoaded
  router();
});
