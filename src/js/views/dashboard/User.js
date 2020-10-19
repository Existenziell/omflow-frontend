import AbstractView from "../AbstractView.js";
import axios from 'axios';
import '../../../scss/users.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.data = {};
    this.user = {};
  }

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

  logout = token => {
    localStorage.setItem("auth-token", "");
    localStorage.setItem("user-id", "");
    localStorage.setItem("user-name", "");
    token = "";

    history.pushState(null, null, '/');
    window.location = '/';
  }

  fetchData = async () => {
    const authToken = window.localStorage.getItem("auth-token");
    const response = await axios.get(`${process.env.API_URL}/users/`, { headers: { "x-auth-token": authToken } })
    this.user = response.data;
    return response.data
  }

  getTeacherData = async () => {
    return await this.fetchData();
  }

  getRole = async () => {
    const response = await this.fetchData();
    return response.role;
  }

  getHtml = async () => {
    await this.fetchData();
    return this.html();
  }

  html = () => {
    const { id, name, email, location, createdAt } = this.user;

    return `
      <section class='user-space'>
        <h2>Welcome to your personal space ${name}</h2>
        <form id="edit-user" action="${process.env.API_URL}/users/update/${id}" method="POST">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" required class="form-control user-name" value="${name}" />
          </div>
          <div class="form-group">
            <label>Location:</label>
            <input type="text" class="form-control user-location" value="${location}" />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="text" required class="form-control user-email" value="${email}" disabled />
          </div>
          <div class="form-group">
            <label>Omflower since:</label>
            <input type="text" required class="form-control user-createdAt" value="${moment(createdAt).fromNow()}" disabled />
          </div>
          <div class="form-group">
            <label>Omflow ID:</label>
            <input type="text" class="form-control user-id" value="${id}" disabled />
          </div>
          <div class="form-group">
            <p class="server-msg"></p>
            <a href="" id="save-user" class="btn btn-sm btn-outline-info">Save</a>
          </div>
        </form>
      </section>
    `;
  }
}
