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
            <a href="/teachers/${t._id}" data-link>
              <h3>${t.name}</h3>
              <img src="/img/teachers/${t.tag}.jpg" />
            </a>
          </li>
      `;
    }

    output += `
      </ul>
    `;

    return output;
  }
}
