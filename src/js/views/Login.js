import AbstractView from "./AbstractView.js";
import axios from 'axios';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
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
        localStorage.setItem("user-name", res.data.user.name);

        history.pushState(null, null, '/');
        window.location = '/';
      } catch (err) {
        const msg = document.querySelector(".error-msg-login");
        msg.style.display = 'block';
        msg.innerHTML = err.response.data.msg;
      }
    }
  }

  async getHtml() {
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
