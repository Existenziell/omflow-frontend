import AbstractView from "./AbstractView.js";
import '../../scss/classes.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.practiceId = params.id;
  }

  getHtml = async () => {
    const practice = await (await fetch(`${process.env.API_URL}/practices/${this.practiceId}`)).json();
    this.setTitle(`${practice.name}`);
    return this.html(practice);
  }

  html(practice) {
    const { level, style, teacher, name, description, duration, date, _id } = practice;

    return `
      <section class="practice-container">
        <h2>${style.identifier}</h2>
        <h3>For ${level.identifier} students</h3>
        <p>Teacher: ${teacher.name}</p>
        <p>Duration: ${duration} minutes</p>
        <p>${moment(date).format("dddd, MMMM Do YYYY")}</p>
        <p>At: ${moment(date).format("h:mm a")} (${moment(date).fromNow()})</p>
        <p>Name: ${name}</p>
        <p>Details: ${description}</p>
        <div>
          <a href="/signup/${_id}/" class="btn btn-sm btn-outline-info" data-link>Signup!</a>
          <a href="/classes" class="btn btn-outline-secondary btn-sm back" data-link>Back</a>
        </div>
      </section>
    `;
  }
}
