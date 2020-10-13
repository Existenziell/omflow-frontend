import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
  }

  initLoginOverlay = () => {
    const loginOverlay = $("#login-overlay");
    $(".show-login-layer").on("click", (e) => {
      loginOverlay.css('display', 'flex');
      initLoginForm()
      e.preventDefault();
    });

    $('.form-close').on('click', (e) => {
      loginOverlay.hide();
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
        console.log(loginUser);
        const res = await axios.post(
          "http://localhost:5000/users/login",
          loginUser
        );
        localStorage.setItem("auth-token", res.data.token);
        history.pushState(null, null, '/');
        document.getElementById('login-overlay').style.display = "none";
        document.getElementById('welcomeMsg').innerHTML = `Welcome to Omflow ${res.data.email}<br />You are now registered, logged-in and ready to go!`;

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
      initRegisterForm();
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
          "http://localhost:5000/users/register",
          registerUser
        );

        // console.log(res.data);
        // localStorage.setItem("auth-token", res.data.token);
        document.getElementById('login-overlay').style.display = "flex";
        document.getElementById('register-overlay').style.display = "none";

      } catch (err) {
        const msg = document.querySelector(".error-msg-register");
        msg.style.display = 'block';
        msg.innerHTML = err.response.data.msg;
      }
    }
  }

  initHeaderForms = () => {
    this.initLoginOverlay()
    this.initRegisterOverlay()
  }

  async getHtml() {
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
              <li class="nav-item">
                <a href="/dashboard" class="nav-link" data-link>Dashboard</a>
              </li>
            </ul>
          </div>

          <!-- Right-->
          <ul class="navbar-nav">
            <li class="nav-item">
              <button class="btn btn-sm btn-outline-info show-login-layer">Login</button>
            </li>
            <li class="nav-item">
              <button class="btn btn-sm btn-outline-info show-register-layer">Register</button>
            </li>
          </ul>

        </div>
      </nav>

      <div id="login-overlay">
        <div class="form">
          <i class="fa fa-times form-close" aria-hidden="true"></i>
          <h1>Login to Omflow</h1>
          <form id="login-form" action="http://localhost:5000/users/login" method="POST">
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
          <form id="register-form" action="http://localhost:5000/users/register" method="POST">
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
