import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
  }

  async getHtml() {
    return `
      <nav class="navbar navbar-expand-md navbar-light">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <!-- Left -->
          <div class="navbar-nav mr-auto">
            <a href="/" class="navbar-brand mx-auto" data-link>Home</a>
          </div>
          <!-- Center -->
          <div class="mx-auto order-0">
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
          <ul class="navbar-nav ml-auto">
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
            <input type="submit" class="btn btn-info">
          </form>
        </div>
      </div>

      <div class="loader loader-bouncing"></div>
    `;
  }
}
