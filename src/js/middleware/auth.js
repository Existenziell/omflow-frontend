const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  let token = window.localStorage.getItem("auth-token");
  if (token === null) {
    localStorage.setItem("auth-token", "");
    token = "";
  }
  const tokenRes = await axios.post(
    `${process.env.API_URL}/users/isTokenValid`,
    null,
    { headers: { "x-auth-token": token } }
  );
  if (tokenRes.data) {
    const userRes = await axios.get(`${process.env.API_URL}/users/`, {
      headers: { "x-auth-token": token },
    });
    // setUserData({
    //   token,
    //   user: userRes.data,
    // });
    // next();
  }
}
