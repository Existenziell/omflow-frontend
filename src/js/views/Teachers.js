import AbstractView from './AbstractView.js';
import '../../scss/teachers.scss';


export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Teachers");
    this.teachers = [];
  }

  async getHtml() {
    // Fetch all necessary data from backend
    const teachers = await (await fetch(`${process.env.API_URL}/teachers/`)).json();
    this.teachers = teachers;
    return this.html();
  }

  html = () => {
    let output = `
      <ul class="teachers-list">
    `;

    for (let t of this.teachers) {
      output += `
          <li>
            <a href="/teachers/${t._id}" class="teacher-name" data-link>${t.name}</a>
            <img src="/img/teachers/${t.tag}.jpg" alt="${t.tag}" />
            <a href="/teachers/${t._id}" class="link" data-link>More details</a>
          </li>
      `;
    }

    output += `
      </ul>
    `;

    return output;
  }
}
