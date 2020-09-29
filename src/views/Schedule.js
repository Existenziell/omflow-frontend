import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Schedule");
  }

  async getHtml() {
    return `
      <h1>Schedule</h1>
    `;
  }
}
