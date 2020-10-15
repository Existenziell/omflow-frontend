import AbstractView from "./AbstractView.js";
import { ClassesList } from "./dashboard/ClassesList.js";
import axios from 'axios';
import '../../scss/users.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);

    this.user = {};
    this.teacherClasses = {};
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

  async getHtml(data) {
    const authToken = window.localStorage.getItem("auth-token");
    await axios.get(`${process.env.API_URL}/users/`, { headers: { "x-auth-token": authToken } })
      .then(response => {
        this.user = response.data;
      })
      .catch(error => console.error(error));
    return this.html(data);
  }

  html = (data) => {

    // If user is of role teacher show his/her classes
    // ToDo: Matching on IDs will not work...
    if (this.user.role === 'teacher') {
      this.teacherClasses = data.practices.filter((p) => {
        return p.teacher._id === this.user.id;
      })
    }
    return `
      <div class='user-space'>
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
            <label>Omflow ID:</label>
            <input type="text" class="form-control user-id" value="${this.user.id}" disabled />
          </div>
          <div class="form-group">
            <p class="server-msg"></p>
            <a href="" id="save-user" class="btn btn-primary">Save</a>
          </div>
        </form>
      </div>

      ${this.user.role === 'admin' ?
        ClassesList(data.practices) : ''
      }
      ${this.user.role === 'teacher' ?
        ClassesList(this.teacherClasses) : ''
      }
`;
  }
}
