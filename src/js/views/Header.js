import AbstractView from "./AbstractView.js";
import User from './User.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
  }

  setActiveNavItem = () => {
    let links = [...document.querySelectorAll('.nav-link')];  // Convert from NodeList to Arrat by spreading
    for (let link of links) {
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add('active');
      }
    }
  }

  async getHtml() {
    const isLoggedIn = await new User().isLoggedIn();

    return `

      <!--Navbar-->
      <nav class="navbar navbar-expand-md navbar-light">

        <!-- Left / Navbar brand -->
        <div class="navbar-nav">
          <a href="/" class="navbar-brand mx-auto" data-link>Home</a>
        </div>

        <!-- Collapse button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible content -->
        <div class="collapse navbar-collapse w-100" id="navbarSupportedContent">

          <!-- Center -->
          <div class="mx-auto">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a href="/about" class="nav-link" data-link>About</a>
              </li>
              <li class="nav-item">
                <a href="/teachers" class="nav-link" data-link>Teachers</a>
              </li>
              <li class="nav-item">
                <a href="/classes" class="nav-link" data-link>Classes</a>
              </li>
              <li class="nav-item">
                <a href="/matchme" class="nav-link" data-link>MatchMe</a>
              </li>
              <li class="nav-item">
                <a href="/map" class="nav-link" data-link>Map</a>
              </li>
              <li class="nav-item">
                <a href="/schedule" class="nav-link" data-link>Schedule</a>
              </li>
              ${isLoggedIn ?
        `<li class="nav-item">
                  <a href="/dashboard" class="nav-link" data-link>Dashboard</a>
                </li>`
        : ``}
            </ul>
          </div>
        </div>
      </nav>

      <div class="header-forms">
        ${isLoggedIn ?
        `<a href="/logout" class="btn btn-sm btn-outline-info" id="logout-user" data-link>Logout</a>`
        :
        `<a href="/login" class="btn btn-sm btn-outline-info" data-link>Login</a>
        <a href="/register" class="btn btn-sm btn-outline-info" data-link>Register</a>`
      }
      </div>

      <div class="loader loader-bouncing"></div>
    `;
  }
}
