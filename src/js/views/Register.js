import AbstractView from "./AbstractView.js";
import axios from 'axios';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Register");
  }

  initRegisterForm = () => {
    const registerForm = document.getElementById('register-form');
    registerForm.onsubmit = (e) => {
      e.preventDefault();
      this.submitRegisterForm(registerForm)
    }
  }

  submitRegisterForm = async (registerForm) => {
    const email = registerForm.elements['email'].value;
    const password = registerForm.elements['password'].value;
    const passwordCheck = registerForm.elements['passwordCheck'].value;
    const name = registerForm.elements['name'].value;
    const registerUser = { email, password, passwordCheck, name };
    try {
      const res = await axios.post(
        `${process.env.API_URL}/users/register`,
        registerUser
      );
      history.pushState(null, null, '/');
      window.location = '/';
    } catch (err) {
      this.displayError(err.response.data.msg);
    }
  }

  displayError = (error) => {
    document.getElementById('loader').classList.remove("is-active");
    const msg = document.querySelector(".error-msg-register");
    msg.style.display = 'block';
    msg.innerHTML = error;
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
