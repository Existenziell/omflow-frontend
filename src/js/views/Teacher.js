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

    const { name, description, address, tag, image, video, practices, pose, instagram, createdAt, quote } = this.teacher;
    let output = `
      <section class="teacher-container">
        <h2>${name}</h2>
        <h3>Bio:</h3>
        <p>${description}</p>
        <h3>Currently teaching from:</h3>
        <p>${address}</p>
        <h3>Some impressions:</h3>
        <section class="teacher-media">
          <img src="/img/teachers/${tag}.jpg" alt="${tag}" />
          ${video}
          <span>${name} has been an Omie since ${moment(createdAt).fromNow(true)}.</span>
        </section>
      ${practices.length > 0 ?
        `<h3>${name} offers the following classes:</h3>` : ``
      }
        <ul>
      `;
    for (let p of practices) {
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

        <div class="teacher-quote">
          <span class="quote-mark">“</span>
          <span class="quote-text">${quote}</spam>
        </div>
        <h3>Preferred Pose:</h3>
        <p>${pose}</p>
        <h3>Follow ${name} on Instagram:</h3>
        <a href="https://www.instagram.com/${instagram}/" class="teacher-social" target="_blank">
          <i class="fa fa-instagram" aria-hidden="true"></i>
          <span>@${instagram}</span>
        </a>
        <a href="/teachers" class="btn btn-outline-secondary btn-sm back" data-link>Back</a>
        </section>
      `;

    return output;
  }
}
