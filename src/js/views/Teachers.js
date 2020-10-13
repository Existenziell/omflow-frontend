import AbstractView from './AbstractView.js';
import '../../scss/teachers.scss';


export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Teachers");
    this.teachers = [];
  }

  async getHtml({ teachers }) {
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
            <h3><a href="/teachers/${t._id}" data-link>${t.name}</a></h3>
            <img src="/img/teachers/${t.image}" />
            <p>${t.description}</p>
            <p>${t.address}</p>
          </li>
      `;
    }

    output += `
      </ul>
    `;

    return output;
  }
}
