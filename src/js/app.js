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

import User from './views/User.js';
import Login from "./views/Login.js";
import Register from "./views/Register.js";

import Dashboard from "./views/Dashboard.js";
import EditClass from "./views/dashboard/EditClass.js";
import CreateClass from "./views/dashboard/CreateClass.js";

import { initMap } from './map.js';

let data = {
  practices: [],
  teachers: []
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
    { path: "/login", view: Login, js: 'login' },
    { path: "/register", view: Register, js: 'register' },
    { path: "/about", view: About },
    { path: "/map", view: Map, js: 'map' },
    { path: "/teachers", view: Teachers },
    { path: "/teachers/:id", view: Teacher },
    { path: "/classes", view: Classes },
    { path: "/classes/:id", view: Class },
    { path: "/matchme", view: MatchMe, js: 'matchme' },
    { path: "/schedule", view: Schedule, js: 'schedule' },
    { path: "/dashboard", view: Dashboard, js: 'dashboard' },
    { path: "/dashboard/classes/create", view: CreateClass, js: 'dashboard-create' },
    { path: "/dashboard/classes/:id", view: EditClass, js: 'dashboard-edit' },
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

  // Is this user loggedIn? Pass down id...
  const currentUser = {
    token: window.localStorage.getItem("auth-token"),
    id: window.localStorage.getItem("user-id"),
    name: window.localStorage.getItem("user-name")
  }

  // Create new instance of the view at matched route...
  const view = new match.route.view(getParams(match));
  const header = new Header();
  const footer = new Footer();

  // And call its getHtml class method
  document.querySelector("#app").innerHTML = await view.getHtml(data, currentUser);
  document.querySelector("#header").innerHTML = await header.getHtml();
  document.querySelector("#footer").innerHTML = await footer.getHtml();

  // Add js requirements for route
  switch (match.route.js) {
    case 'login': {
      new Login().initLoginForm();
      break;
    }
    case 'register': {
      new Register().initRegisterForm();
      break;
    }
    case 'map': {
      // new Map().initMap(data);
      initMap(data);
      break;
    }
    case 'matchme': {
      new MatchMe().initForms();
      break;
    }
    case 'schedule': {
      new Schedule().initCalendar();
      break;
    }
    case 'dashboard': {
      new Dashboard().deletePractice();
      break;
    }
    case 'dashboard-edit': {
      new Dashboard().editPractice();
      new Dashboard().initDatetimePicker();
      break;
    }
    case 'dashboard-create': {
      new Dashboard().createPractice();
      new Dashboard().initDatetimePicker();
      break;
    }
    // Always do:
    default: {

      // If path is /logout run logout method from User
      if (location.pathname === '/logout') {
        await new User().logout();
      }

      break;
    }
  }
};

// Run router if user navigates in browser
window.addEventListener("popstate", router);

// Fetch all clicks on data-links // prevent page reload // Let router handle the navigation
document.addEventListener("DOMContentLoaded", async () => {

  // Fetch all necessary data from backend
  const teachers = await (await fetch(`${process.env.API_URL}/teachers/`)).json();
  const practices = await (await fetch(`${process.env.API_URL}/practices/`)).json();
  data = {
    teachers,
    practices
  }

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
