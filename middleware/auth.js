const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  let token = window.localStorage.getItem("auth-token");
  if (token === null) {
    localStorage.setItem("auth-token", "");
    token = "";
  }
  const tokenRes = await axios.post(
    "http://localhost:5000/users/isTokenValid",
    null,
    { headers: { "x-auth-token": token } }
  );
  if (tokenRes.data) {
    const userRes = await axios.get("http://localhost:5000/users/", {
      headers: { "x-auth-token": token },
    });
    // setUserData({
    //   token,
    //   user: userRes.data,
    // });
    // next();
  }
}
