import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.practiceId = params.id;
  }

  async getHtml() {

    return this.html();
  }

  html = () => {
    return `
      <h1>Signup</h1>
    `;
  }
}
