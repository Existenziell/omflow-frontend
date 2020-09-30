const initLoginOverlay = () => {
  const loginOverlay = $("#login-overlay");
  $(".show-login-layer").on("click", (e) => {
    loginOverlay.css('display', 'flex');
    e.preventDefault();
  });

  $('.form-close').on('click', (e) => {
    loginOverlay.hide();
    e.preventDefault();
  });
}

const initSubmitLoginForm = () => {
  const login = document.getElementById('login-form');
  login.onsubmit = async (e) => {
    const email = document.forms['login'].elements['email'].value;
    const password = document.forms['login'].elements['password'].value;

    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      // setUserData({
      //   token: loginRes.data.token,
      //   user: loginRes.data.user,
      // });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.pushState(null, null, '/');
    } catch (err) {
      console.log(err);
    }
  }
}

const initRegisterOverlay = () => {
  const registerOverlay = $("#register-overlay");
  $(".show-register-layer").on("click", (e) => {
    registerOverlay.css('display', 'flex');
    e.preventDefault();
  });

  $('.form-close').on('click', (e) => {
    registerOverlay.hide();
    e.preventDefault();
  });
}

const initHeaderForms = () => {
  initSubmitLoginForm()
  initLoginOverlay()
  initRegisterOverlay()
}

export { initHeaderForms }
