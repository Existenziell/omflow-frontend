import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async getHtml() {
    return `
        <h1>Welcome Home, Omflow</h1>
        <a href="/teachers" data-link>View teachers</a>
        <a href="/classes" data-link>View classes</a>
    `;
  }
}
