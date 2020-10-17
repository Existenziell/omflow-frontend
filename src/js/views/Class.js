import AbstractView from "./AbstractView.js";
import '../../scss/classes.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.practiceId = params.id;
  }

  async getHtml() {
    const practice = await (await fetch(`${process.env.API_URL}/practices/${this.practiceId}`)).json();
    this.setTitle(`${practice.name}`);
    return this.html(practice);
  }

  html(practice) {
    return `
      <section class="practice-container">
        <h2>${practice.level.identifier} ${practice.style.identifier}</h2>
        <p>With Omie: ${practice.teacher.name}</p>
        <p>Name: ${practice.name}</p>
        <p>Details: ${practice.description}</p>
        <p>Duration: ${practice.duration}</p>
        <p>Date: ${moment(practice.date).format("dddd, MMMM Do YYYY, h:mm a")} (${moment(practice.date).fromNow()})</p >
      </section >
      <a href="/signup/${practice._id}/" class="btn btn-primary" data-link>Signup!</a>
      <a href="/classes" class="link" data-link>Back</a>
    `;
  }
}
