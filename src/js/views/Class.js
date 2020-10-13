import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.practiceId = params.id;
    this.options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  }

  async getHtml() {
    const practice = await (await fetch(`http://localhost:5000/practices/${this.practiceId}`)).json();
    this.setTitle(`${practice.name}`);
    return this.html(practice);
  }

  html(practice) {
    return `
      <small>Class ID: ${practice._id}</small>
      <h2>${practice.name}</h2>
      <p>With teacher: ${practice.teacher.name}</p>
      <p>${practice.description}</p>
      <p>Duration: ${practice.duration}</p>
      <p>Date: ${new Date(practice.date).toLocaleDateString("en-US", this.options)}</p>
    `;
  }
}
