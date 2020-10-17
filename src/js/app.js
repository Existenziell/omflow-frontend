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
import Signup from "./views/Signup.js";

import User from './views/dashboard/User.js';
import Login from "./views/Login.js";
import Register from "./views/Register.js";

import Dashboard from "./views/Dashboard.js";
import EditClass from "./views/dashboard/EditClass.js";
import CreateClass from "./views/dashboard/CreateClass.js";

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
  if (url === location.href) return;
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
    { path: "/register", view: Register, js: 'register' },
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

  // Create new instance of the view at matched route...
  const view = new match.route.view(getParams(match));
  const header = new Header();
  const footer = new Footer();

  // ...and call its getHtml class method
  document.querySelector("#header").innerHTML = await header.getHtml();
  document.querySelector("#app").innerHTML = await view.getHtml();
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
      new Dashboard().editUser();
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
    default: {
      // If path is /logout run logout method from User
      if (location.pathname === '/logout') {
        await new User().logout();
      }
      break;
    }
  }
  // Finally, highlight active navigation link
  new Header().setActiveNavItem();

  // When everything is loaded, deactivate loader
  loader.classList.remove("is-active");
};

// Run router if user navigates in browser
window.addEventListener("popstate", router);

// Fetch all clicks on data-links // Prevent page reload // Let router handle the navigation
document.addEventListener("DOMContentLoaded", async () => {
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
