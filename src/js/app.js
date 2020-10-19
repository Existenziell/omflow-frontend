import Header from "./views/Header"
import Footer from "./views/Footer"
import Home from "./views/Home"
import About from "./views/About"
import Map from "./views/Map"
import Teacher from "./views/Teacher"
import Teachers from "./views/Teachers"
import Class from "./views/Class"
import Classes from "./views/Classes"
import MatchMe from "./views/MatchMe"
import Schedule from "./views/Schedule"
import Signup from "./views/Signup"

import User from './views/dashboard/User'
import Login from "./views/Login"
import Register from "./views/Register"

import Dashboard from "./views/Dashboard"
import EditClass from "./views/dashboard/EditClass"
import CreateClass from "./views/dashboard/CreateClass"

import {
  createPractice, editPractice, deletePractice,
  editUser, deleteUser,
  editTeacher,
  setActiveNavItem, initDatetimePicker
} from './functions';

const loader = document.getElementById('loader');

const pathToRegex = path =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]];
  }));
};

// Navigate to url and initiate router
const navigateTo = url => {
  // Abort if current route is equal to clicked route
  if (url === location.href) {
    return;
  }
  // Activate loader as long as data is getting fetched
  loader.classList.add("is-active");
  // Use history API
  history.pushState(null, null, url);
  router();
};

// Frontend routes
const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/login", view: Login, js: 'login' },
    { path: "/signup", view: Register, js: 'register' },
    { path: "/about", view: About },
    { path: "/map", view: Map, js: 'map' },
    { path: "/teachers", view: Teachers },
    { path: "/teachers/:id", view: Teacher },
    { path: "/classes", view: Classes },
    { path: "/classes/:id", view: Class },
    { path: "/matchme", view: MatchMe, js: 'matchme' },
    { path: "/schedule", view: Schedule, js: 'schedule' },
    { path: "/signup/:id", view: Signup, js: 'signup' },
    { path: "/dashboard", view: Dashboard, js: 'dashboard' },
    { path: "/dashboard/classes/create", view: CreateClass, js: 'createClass' },
    { path: "/dashboard/classes/:id", view: EditClass, js: 'editClass' },
  ];

  // Check if user is loggedIn and if so, which role the user has
  const isLoggedIn = await new User().isLoggedIn();
  let role, token;
  if (isLoggedIn) {
    role = await new User().getRole()
    token = window.localStorage.getItem("auth-token");
  };

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
    // If path is /logout run logout method from User
    if (location.pathname === '/logout') {
      new User().logout(token);
      return;
    }
    // Set route to first in routes array, Home in this case
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }

  // Create new instance of the view at matched route...
  const view = new match.route.view(getParams(match));
  const header = new Header();
  const footer = new Footer();

  // ...and call its getHtml class method
  document.querySelector("#header").innerHTML = await header.getHtml(isLoggedIn, role);
  document.querySelector("#app").innerHTML = await view.getHtml(isLoggedIn, role);
  document.querySelector("#footer").innerHTML = await footer.getHtml();

  // After html content is set, run needed js for matching route
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
      new Map().initMap();
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
      editUser(token);
      deleteUser(token);
      editTeacher(token);
      deletePractice(token);
      break;
    }
    case 'createClass': {
      createPractice(token);
      initDatetimePicker();
      break;
    }
    case 'editClass': {
      editPractice(token);
      initDatetimePicker();
      break;
    }
  }
  // Finally, highlight active navigation link
  setActiveNavItem();

  // When everything is loaded, deactivate loader
  loader.classList.remove("is-active");
};

// Run router if user navigates in browser
window.addEventListener("popstate", router);

// Fetch all clicks on data-links // Prevent page reload // Let router handle the navigation
document.addEventListener("DOMContentLoaded", () => {
  // Catch all clicks on data-link anchors
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href); ``
    }
  });
  document.body.addEventListener("submit", e => {
    loader.classList.add("is-active");
  });

  // Initiate router when DOMContentLoaded
  router();
});
