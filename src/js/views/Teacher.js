import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.teacherId = params.id;
    this.teacher = {};
  }

  getTeacherClasses = () => {
    return this.teacher.practices;
  }

  async getHtml() {
    this.teacher = await (await fetch(`${process.env.API_URL}/teachers/${this.teacherId}`)).json();
    this.setTitle(this.teacher.name);
    return this.html();
  }

  html = () => {
    let output = `
      <section class="teacher-container">
        <h2>${this.teacher.name}</h2>
        <p>${this.teacher.description}</p>
        <p>${this.teacher.address}</p>
        <p>${this.teacher.name} became an Omie ${moment(this.teacher.createdAt).fromNow()}.</p>
        <img src="/img/teachers/${this.teacher.tag}.jpg" alt="${this.teacher.tag}" />
        <span>${this.teacher.name} offers the following classes:</span>
        <ul>
    `;
    for (let p of this.teacher.practices) {
      output += `
          <li>
            <a href="/classes/${p._id}" data-link>
              ${p.name} -  ${p.description} - ${p.duration} min
            </a>
          </li>
      `;
    }
    output += `
        </ul>
      </section>
      <a href="/teachers" class="link" data-link>Back</a>
    `;

    return output;
  }
}
