import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Teachers");
    this.teachers = [];
  }

  async getHtml() {
    this.teachers = await (await fetch('http://localhost:5000/teachers/')).json();
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
            <img src="/img/teachers/${t.image}" />
            <p>${t.description}</p>
            <p>${t.address}</p>
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
