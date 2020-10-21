import AbstractView from './AbstractView.js';
import '../../scss/teachers.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Teachers");
    this.teachers = [];
  }

  getHtml = async () => {
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
            <a href="/teachers/${t._id}" class="teacher-link" data-link></a>
            <h2 class="teacher-name">${t.name}</h2>
            <small>${t.address}</small>
            <img src="${process.env.API_URL}/${t.image}" alt="${t.tag}">
          </li>
      `;
    }

    output += `
      </ul>
    `;

    return output;
  }
}
