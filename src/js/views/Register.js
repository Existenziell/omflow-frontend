import AbstractView from "./AbstractView.js";
import axios from 'axios';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Register");
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

  async getHtml() {
    return `
      <div class="register-form">
        <h1>New here? Register:</h1>
        <form id="register-form" action="${process.env.API_URL}/users/register" method="POST">
        <input type="text" name="name" placeholder="Name (optional)">
        <input type="text" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
          <input type="password" name="passwordCheck" placeholder="Retype password" required>
          <p class="error-msg error-msg-register"></p>
          <input type="submit" class="btn btn-info">
        </form>
      </div>
    `;
  }
}
