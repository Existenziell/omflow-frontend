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
        <h2>${level.identifier} ${style.identifier}</h2>
        <p>With Omie: ${teacher.name}</p>
        <p>Name: ${name}</p>
        <p>Details: ${description}</p>
        <p>Duration: ${duration}</p>
        <p>Date: ${moment(date).format("dddd, MMMM Do YYYY, h:mm a")} (${moment(date).fromNow()})</p >
      </section >
      <a href="/signup/${_id}/" class="btn btn-sm btn-outline-info" data-link>Signup!</a>
      <a href="/classes" class="link" data-link>Back</a>
    `;
  }
}
