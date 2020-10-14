import axios from 'axios';

export default class User {

  isLoggedIn = async () => {
    let token = window.localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
      return false;
    }
    const result = await axios.post(
      `${process.env.API_URL}/users/isTokenValid`,
      null,
      { headers: { "x-auth-token": token } }
    )
    return result.data;
  }

  logout = () => {
    let token = window.localStorage.getItem("auth-token");
    localStorage.setItem("auth-token", "");
    localStorage.setItem("user-id", "");
    localStorage.setItem("user-name", "");
    token = "";
    history.pushState(null, null, '/');
    window.location = '/';
  }
}
