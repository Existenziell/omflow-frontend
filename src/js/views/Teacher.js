import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.teacherId = params.id;
    this.teacher = {};
  }

  getHtml = async () => {
    this.teacher = await (await fetch(`${process.env.API_URL}/teachers/${this.teacherId}`)).json();
    this.setTitle(this.teacher.name);
    return this.html();
  }

  html = () => {
    let output = `
      <section class="teacher-container">
        <h2>${this.teacher.name}</h2>
        <h3>Bio:</h3>
        <p>${this.teacher.description}</p>
        <h3>Currently teaching from:</h3>
        <p>${this.teacher.address}</p>
        <h3>Some impressions:</h3>
        <section class="teacher-media">
          <img src="/img/teachers/${this.teacher.tag}.jpg" alt="${this.teacher.tag}" />
          ${this.teacher.video}
        </section>
        <small>${this.teacher.name} has been an Omie since ${moment(this.teacher.createdAt).fromNow(true)}.</small>
      ${this.teacher.practices.length > 0 ?
        `<h3>${this.teacher.name} offers the following classes:</h3>` : ``
      }
        <ul>
      `;
    for (let p of this.teacher.practices) {
      output += `
          <li>
            <a href="/classes/${p._id}" data-link>
              ${p.level.identifier} ${p.style.identifier} -
              ${moment(p.date).format("dddd, MMMM Do YYYY, h:mm a")} -
              ${p.duration} min
            </a>
          </li>
      `;
    }
    output += `
        </ul>
        <h3>Preferred Pose:</h3>
        <p>${this.teacher.pose}</p>
        <h3>Follow ${this.teacher.name} on Instagram:</h3>
        <a href="https://www.instagram.com/${this.teacher.instagram}/" class="teacher-social" target="_blank">
          <i class="fa fa-instagram" aria-hidden="true"></i>
          <span>@${this.teacher.instagram}</span>
        </a>
      </section>
      <a href="/teachers" class="btn btn-outline-secondary btn-sm back" data-link>Back</a>
      `;

    return output;
  }
}
