import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Classes");
    this.practiceId = params.id;
  }

  async getHtml() {
    const practice = await (await fetch(`http://localhost:5000/practices/${this.practiceId}`)).json();
    return this.html(practice);
  }

  html(practice) {
    return `
      <small>Class ID: ${practice._id}</small>
      <h2>${practice.name}</h2>
      <p>With teacher: ${practice.teacher.name}</p>
      <p>${practice.description}</p>
      <p>Duration: ${practice.duration}</p>
      <p>Date: ${practice.date.substring(0, 10)}</p>
    `;
  }
}
