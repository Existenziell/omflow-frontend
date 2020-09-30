import Home from "../views/Home.js";
import About from "../views/About.js";
import Map from "../views/Map.js";
import Teacher from "../views/Teacher.js";
import Teachers from "../views/Teachers.js";
import Class from "../views/Class.js";
import Classes from "../views/Classes.js";
import MatchMe from "../views/MatchMe.js";
import Schedule from "../views/Schedule.js";
import Dashboard from "../views/Dashboard.js";
import Header from "../views/Header.js";
import Footer from "../views/Footer.js";

import { initLoginOverlay, initRegisterOverlay, initSubmitLoginForm } from './modules.js';
import { initMatchForm } from './matchme.js';
import { initMap } from './map.js';

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
    { path: "/", view: Home },
    { path: "/about", view: About },
    { path: "/map", view: Map, id: 'map' },
    { path: "/teachers", view: Teachers },
    { path: "/teachers/:id", view: Teacher },
    { path: "/classes", view: Classes },
    { path: "/classes/:id", view: Class },
    { path: "/matchme", view: MatchMe, id: 'matchme' },
    { path: "/dashboard", view: Dashboard },
    { path: "/schedule", view: Schedule },
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

  // Create new instance of the view at matched route...
  const view = new match.route.view(getParams(match));
  const header = new Header();
  const footer = new Footer();
  // And call its getHtml class method
  document.querySelector("#app").innerHTML = await view.getHtml();
  document.querySelector("#header").innerHTML = await header.getHtml();
  document.querySelector("#footer").innerHTML = await footer.getHtml();

  // Add js requirements for route
  switch (match.route.id) {
    case 'map': {
      initMap();
      break;
    }
    case 'matchme': {
      initMatchForm();
      break;
    }
    // Always do:
    default: {
      initLoginOverlay();
      initRegisterOverlay();
      initSubmitLoginForm();
      // Hide loader since loading is finished
      const loader = document.querySelector('.loader');
      loader.classList.remove('is-active');
      break;
    }
  }
};

// Run router if user navigates in browser
window.addEventListener("popstate", router);

// Fetch all clicks on data-links // prevent page reload // Let router handle the navigation
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      // Set loader active for the time data is fetched
      const loader = document.querySelector('.loader');
      loader.classList.add('is-active');
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  // Initiate router when DOMContentLoaded
  router();
});
