import AbstractView from '../AbstractView.js';
import User from './User.js';
import axios from 'axios';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle(`Dashboard | Create class`);

    this.teachers = {};
    this.styles = {};
    this.levels = {};

    this.role = '';
    this.teacherId = '';
  }

  getHtml = async () => {
    this.teachers = await (await fetch(`${process.env.API_URL}/teachers/`)).json();
    this.styles = await (await fetch(`${process.env.API_URL}/practices/styles/`)).json();
    this.levels = await (await fetch(`${process.env.API_URL}/practices/levels/`)).json();
    const teacher = await new User().getTeacherData();
    this.role = teacher.role;
    this.teacherName = teacher.teacherName;
    this.teacherId = teacher.teacherId;

    let output = `
      <div>
        <h3>Create Class</h3>
        <form id="create-class" action="${process.env.API_URL}/practices/create" method="POST">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" required class="form-control practice-name" value="" />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <input type="text" required class="form-control practice-description" value="" />
          </div>
          <div class="form-group">
            <label>Duration (in minutes):</label>
            <input type="number" required class="form-control practice-duration" id="duration" value="" />
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
            <label for="teacher-dropdown">Teacher:</label>
            ${this.role === 'admin' ? `
              <select class="form-control practice-teacher">
              ${this.teachers.map((item) => `
                <option value="${item._id}">${item.name}</option>
              `)}
              </select>` : `
              <input type="text" class="form-control practice-teacher" value="${this.teacherId}" disabled />
            `}
          </div>
          <div class="form-group">
            <label for="style-dropdown">Style:</label>
            <select class="form-control practice-style">
            ${this.styles.map((item) => `
              <option value="${item._id}">${item.identifier}</option>
            `)}
            </select>
          </div>
          <div class="form-group">
            <label for="level-dropdown">Level:</label>
            <select class="form-control practice-level">
            ${this.levels.map((item) => `
              <option value="${item._id}">${item.identifier}</option>
            `)}
            </select>
          </div>
          <div class="form-group">
            <input type="submit" id="save-practice" class="btn btn-primary" value="Save" />
            <a href="/dashboard" value="Cancel" class="btn btn-link" data-link>Cancel</a>
          </div>
        </form>
      </div>
    `;
    return output;
  }
}
