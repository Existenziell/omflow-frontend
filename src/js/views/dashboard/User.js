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

  logout = () => {
    let token = window.localStorage.getItem("auth-token");
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
    const response = await this.fetchData();
    return {
      role: response.role,
      practices: response.practices,
      teacherId: response.teacherId,
      teacherName: response.teacherName
    }
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
    return `
      <section class='user-space'>
        <h2>Welcome to your personal space ${this.user.name}</h2>
        <form id="edit-user" action="${process.env.API_URL}/users/update/${this.user.id}" method="POST">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" required class="form-control user-name" value="${this.user.name}" />
          </div>
          <div class="form-group">
            <label>Location:</label>
            <input type="text" class="form-control user-location" value="${this.user.location}" />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="text" required class="form-control user-email" value="${this.user.email}" disabled />
          </div>
          <div class="form-group">
            <label>Role:</label>
            <input type="text" required class="form-control user-role" value="${this.user.role}" disabled />
          </div>
          <div class="form-group">
            <label>Omflower since:</label>
            <input type="text" required class="form-control user-role" value="${moment(this.user.createdAt).fromNow()}" disabled />
          </div>
          <div class="form-group">
            <label>Omflow ID:</label>
            <input type="text" class="form-control user-id" value="${this.user.id}" disabled />
          </div>
          <div class="form-group">
            <p class="server-msg"></p>
            <a href="" id="save-user" class="btn btn-primary">Save</a>
          </div>
        </form>
      </section>
    `;
  }
}
