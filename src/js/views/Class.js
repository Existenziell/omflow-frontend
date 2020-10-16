import AbstractView from "./AbstractView.js";

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
      <small>${practice._id}</small>
      <h2>${practice.level.identifier} ${practice.style.identifier}</h2>
      <p>With Omie: ${practice.teacher.name}</p>
      <p>Name: ${practice.name}</p>
      <p>Details: ${practice.description}</p>
      <p>Duration: ${practice.duration}</p>
      <p>Date: ${moment(practice.date).format("dddd, MMMM Do YYYY, h:mm a")}</p>
      <a href="/classes" class="link" data-link>Back</a>
    `;
  }
}
