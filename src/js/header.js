const initLoginOverlay = () => {
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

const initLoginForm = () => {

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

const initRegisterOverlay = () => {
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

const initRegisterForm = () => {

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
const initHeaderForms = () => {
  initLoginOverlay()
  initRegisterOverlay()
}

export { initHeaderForms }
