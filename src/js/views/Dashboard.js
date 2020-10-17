import AbstractView from "./AbstractView.js";
import User from './dashboard/User.js';
import { AdminSpace } from './dashboard/AdminSpace.js';
import { ClassesList } from "./dashboard/ClassesList.js";
import '../../scss/dashboard.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  getHtml = async (isLoggedIn, role) => {
    let practices = await (await fetch(`${process.env.API_URL}/practices/`)).json();
    if (role === 'teacher') {
      const teacherData = await new User().getTeacherData();
      practices = teacherData.practices;
    }
    if (!isLoggedIn) {
      history.pushState(null, null, '/login');
      window.location = "/login";
    }

    return `
      ${role === 'user' ? await new User().getHtml() : ''}
      ${role === 'teacher' ? await ClassesList(practices) : ''}
      ${role === 'admin' ? await AdminSpace(practices, role) : ''}
    `;
  }
}
