import AbstractView from "./AbstractView.js";
import User from './User.js';
import axios from 'axios';

export default class extends AbstractView {
  constructor(params) {
    super(params);
  }

  initLoginOverlay = () => {
    const loginOverlay = $("#login-overlay");
    $(".show-login-layer").on("click", (e) => {
      loginOverlay.css('display', 'flex');
      this.initLoginForm()
      e.preventDefault();
    });

    $('.form-close').on('click', (e) => {
      loginOverlay.hide();
      e.preventDefault();
    });
  }

  initLogout = () => {
    $(".logout-user").on("click", (e) => {
      new User().logout();
      e.preventDefault();
    });
  }

  initLoginForm = () => {
    const login = document.getElementById('login-form');
    login.onsubmit = async (e) => {
      const email = login.elements['email'].value;
      const password = login.elements['password'].value;

      e.preventDefault();
      try {
        const loginUser = { email, password };
        const res = await axios.post(
          `${process.env.API_URL}/users/login`,
          loginUser
        );

        // Set JWT x-auth-token in client localStorage
        localStorage.setItem("auth-token", res.data.token);
        localStorage.setItem("user-id", res.data.user.id);
        localStorage.setItem("user-name", res.data.user.displayName);

        history.pushState(null, null, '/');
        window.location = '/';
      } catch (err) {
        const msg = document.querySelector(".error-msg-login");
        msg.style.display = 'block';
        msg.innerHTML = err.response.data.msg;
      }
    }
  }

  initRegisterOverlay = () => {
    const registerOverlay = $("#register-overlay");
    $(".show-register-layer").on("click", (e) => {
      registerOverlay.css('display', 'flex');
      this.initRegisterForm();
      e.preventDefault();
    });

    $('.form-close').on('click', (e) => {
      registerOverlay.hide();
      e.preventDefault();
    });
  }

  initRegisterForm = () => {
    const register = document.getElementById('register-form');
    register.onsubmit = async (e) => {
      const email = register.elements['email'].value;
      const password = register.elements['password'].value;
      const passwordCheck = register.elements['passwordCheck'].value;
      const registerUser = { email, password, passwordCheck };
      e.preventDefault();

      try {
        const res = await axios.post(
          `${process.env.API_URL}/users/register`,
          registerUser
        );
        history.pushState(null, null, '/');
        window.location = '/';
      } catch (err) {
        const msg = document.querySelector(".error-msg-register");
        msg.style.display = 'block';
        msg.innerHTML = err.response.data.msg;
      }
    }
  }

  initHeaderForms = () => {
    this.initLoginOverlay();
    this.initRegisterOverlay();
    this.initLogout();
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
        `<button class="btn btn-sm btn-outline-info logout-user">Logout</button>`
        :
        `<button class="btn btn-sm btn-outline-info show-login-layer">Login</button>
        <button class="btn btn-sm btn-outline-info show-register-layer">Register</button>`
      }
      </div>

      <div id="login-overlay">
        <div class="form">
          <i class="fa fa-times form-close" aria-hidden="true"></i>
          <h1>Login to Omflow</h1>
          <form id="login-form" action="${process.env.API_URL}/users/login" method="POST">
            <input type="text" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <p class="error-msg error-msg-login"></p>
            <input type="submit" class="btn btn-info">
          </form>
        </div>
      </div>

      <div id="register-overlay">
        <div class="form">
          <i class="fa fa-times form-close" aria-hidden="true"></i>
          <h1>New here? Register...</h1>
          <form id="register-form" action="${process.env.API_URL}/users/register" method="POST">
            <input type="text" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="password" name="passwordCheck" placeholder="Retype password" required>
            <p class="error-msg error-msg-register"></p>
            <input type="submit" class="btn btn-info">
          </form>
        </div>
      </div>

      <div class="loader loader-bouncing"></div>
    `;
  }
}
