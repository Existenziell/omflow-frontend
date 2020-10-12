import Header from "./views/Header.js";
import Footer from "./views/Footer.js";
import Home from "./views/Home.js";
import About from "./views/About.js";
import Map from "./views/Map.js";
import Teacher from "./views/Teacher.js";
import Teachers from "./views/Teachers.js";
import Class from "./views/Class.js";
import Classes from "./views/Classes.js";
import MatchMe from "./views/MatchMe.js";
import Schedule from "./views/Schedule.js";

import Dashboard from "./views/Dashboard.js";
import EditClass from "./views/dashboard/EditClass.js";
import CreateClass from "./views/dashboard/CreateClass.js";

import { initHeaderForms } from './header.js';
import { initMatchForm } from './matchme.js';
import { initMap } from './map.js';
import { createPractice, editPractice, deletePractice } from './dashboard.js';

let data = {
  practices: [],
  teachers: [],
  mapdata: {}
}

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
    { path: "/schedule", view: Schedule },
    { path: "/dashboard", view: Dashboard, id: 'dashboard' },
    { path: "/dashboard/classes/create", view: CreateClass, id: 'dashboard-create' },
    { path: "/dashboard/classes/:id", view: EditClass, id: 'dashboard-edit' },
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
  document.querySelector("#app").innerHTML = await view.getHtml(data);
  document.querySelector("#header").innerHTML = await header.getHtml();
  // document.querySelector("#footer").innerHTML = await footer.getHtml();

  // Add js requirements for route
  switch (match.route.id) {
    case 'map': {
      initMap(data);
      break;
    }
    case 'matchme': {
      initMatchForm();
      break;
    }
    case 'dashboard': {
      deletePractice();
      break;
    }
    case 'dashboard-edit': {
      editPractice();
      break;
    }
    case 'dashboard-create': {
      createPractice();
      break;
    }
    // Always do:
    default: {
      break;
    }
  }
  initHeaderForms();
};

// Run router if user navigates in browser
window.addEventListener("popstate", router);

// Fetch all clicks on data-links // prevent page reload // Let router handle the navigation
document.addEventListener("DOMContentLoaded", async () => {

  // Fetch all necessary data from backend
  const practices = await (await fetch('http://localhost:5000/practices/')).json();
  const teachers = await (await fetch('http://localhost:5000/teachers/')).json();
  const mapdata = await (await fetch('http://localhost:5000/maps/')).json();
  data = {
    practices,
    teachers,
    mapdata
  }

  // Initialize Calendar for Schedule
  // var calendarEl = document.getElementById('calendar');
  // console.log(calendarEl);
  // var calendar = new Calendar(calendarEl, {
  //   plugins: [dayGridPlugin]
  // });
  // calendar.render();

  // Catch all clicks on data-link anchors
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  // Initiate router when DOMContentLoaded
  router();
});
