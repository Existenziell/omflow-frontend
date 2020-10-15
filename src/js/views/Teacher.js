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
        <small>#${this.teacher._id}</small>
        <h2>${this.teacher.name}</h2>
        <p>${this.teacher.description}</p>
        <p>${this.teacher.address}</p>
        <img src="/img/teachers/${this.teacher.tag}.jpg" />
        <span>${this.teacher.name} offers the following classes:</span>
        <ul>
    `;
    for (let p of this.teacher.practices) {
      output += `
          <li>${p.name} -  ${p.description} - ${p.duration} min</li>
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
