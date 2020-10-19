export const RegisterSuccess = (registerUser, res) => {
  const name = registerUser.name === '' ? registerUser.email : registerUser.name;
  return `
    <div class="register-succes">
      <h2>${name}, Welcome to Omflow :)</h2>
      <p>
        ${res.data.message}<br />
        Please activate your account through the link in this email.
      </p>
    </div>
  `;
}
