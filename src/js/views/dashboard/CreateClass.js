import AbstractView from '../AbstractView.js';
import User from './User.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle(`Dashboard | Create class`);
  }

  getHtml = async (isLoggedIn, role) => {
    let teachers, teacher;
    if (role === 'teacher') {
      teacher = await (await new User().getTeacherData()).teacher;
    }
    if (role === 'admin') {
      teachers = await (await fetch(`${process.env.API_URL}/teachers/`)).json();
    }
    const styles = await (await fetch(`${process.env.API_URL}/practices/styles/`)).json();
    const levels = await (await fetch(`${process.env.API_URL}/practices/levels/`)).json();

    let output = `
      <section class="create-class">
        <h3>Create Class</h3>

        <form id="create-class" action="${process.env.API_URL}/practices/create" method="POST">
          ${role === 'admin' ? `
          <div class="form-group">
            <label for="teacher-dropdown">Teacher:</label>
              <select class="form-control practice-teacher">
              ${teachers.map((item) => `
                <option value="${item._id}">${item.name}</option>
              `)}
              </select>
          </div>` : `
          <input type="hidden" class="form-control practice-teacher" value="${teacher._id}" disabled />
          `}
          <div class="form-group">
            <label for="style-dropdown">Style:</label>
            <select class="form-control practice-style">
            ${styles.map((item) => `
              <option value="${item._id}">${item.identifier}</option>
            `)}
            </select>
          </div>
          <div class="form-group">
            <label for="level-dropdown">Level:</label>
            <select class="form-control practice-level">
            ${levels.map((item) => `
              <option value="${item._id}">${item.identifier}</option>
            `)}
            </select>
          </div>
          <div class="form-group">
            <label>Description:</label>
            <input type="text" class="form-control practice-description" value="" />
          </div>
          <div class="form-group">
            <label>Duration (in minutes):</label>
            <input type="number" class="form-control practice-duration" id="duration" value="" required />
          </div>
          <div class="form-group">
            <label>Date:</label>
            <div>
              <div class="input-group date" data-provide="datetimepicker">
                <input type="text" class="form-control practice-date datetimepicker">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Price (in USD):</label>
            <input type="number" class="form-control practice-price" value="" required />
          </div>

          <div class="form-group">
            <input type="submit" id="save-practice" class="btn btn-sm btn-outline-info" value="Save" />
            <a href="/dashboard" value="Cancel" class="btn btn-link" data-link>Cancel</a>
          </div>
        </form>

      </section>
    `;
    return output;
  }
}
