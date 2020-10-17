import AbstractView from "./AbstractView.js";
import axios from 'axios';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  initLoginForm = () => {
    const loginForm = document.getElementById('login-form');
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      this.submitLoginForm(loginForm);
    }
  }

  submitLoginForm = async (loginForm) => {
    const email = loginForm.elements['email'].value;
    const password = loginForm.elements['password'].value;
    try {
      const loginUser = { email, password };
      const res = await axios.post(
        `${process.env.API_URL}/users/login`,
        loginUser
      );
      await this.setLocalStorage(res.data);

      history.pushState(null, null, '/');
      window.location = '/';
    } catch (err) {
      this.displayError(err.response.data.msg);
    }
  }

  // Set JWT x-auth-token in client localStorage
  setLocalStorage = async (data) => {
    localStorage.setItem("auth-token", data.token);
    localStorage.setItem("user-id", data.user.id);
    localStorage.setItem("user-name", data.user.name);
  }

  displayError = (error) => {
    document.getElementById('loader').classList.remove("is-active");
    const msg = document.querySelector(".error-msg-login");
    msg.style.display = 'block';
    msg.innerHTML = error;
  }

  getHtml = async () => {
    return `
      <div class="login-form">
        <h1>Login to Omflow</h1>
        <form id="login-form" action="${process.env.API_URL}/users/login" method="POST">
          <input type="text" name="email" placeholder="Email" required>
          <input type="password" name="password" placeholder="Password" required>
          <p class="error-msg error-msg-login"></p>
          <input type="submit" class="btn btn-info" value="Login">
        </form>
      </div>
    `;
  }
}
