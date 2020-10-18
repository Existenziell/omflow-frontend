import AbstractView from "./AbstractView.js";
import User from './dashboard/User.js';
import { AdminSpace } from './dashboard/AdminSpace.js';
import { TeacherSpace } from './dashboard/TeacherSpace.js';
import '../../scss/dashboard.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
    this.teacherData = {};
  }

  getHtml = async (isLoggedIn, role) => {
    if (!isLoggedIn) {
      history.pushState(null, null, '/login');
      window.location = "/login";
    }
    if (role === 'teacher') {
      this.teacherData = await new User().getTeacherData();
    }
    let practices = await (await fetch(`${process.env.API_URL}/practices/`)).json();

    return `
      ${role === 'user' ? await new User().getHtml() : ''}
      ${role === 'teacher' ? await TeacherSpace(this.teacherData, role) : ''}
      ${role === 'admin' ? await AdminSpace(practices, role) : ''}
    `;
  }
}
