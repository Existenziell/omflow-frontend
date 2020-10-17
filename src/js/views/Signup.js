import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.practiceId = params.id;
  }

  getHtml = async () => {
    return `
      <h1>Signup</h1>
    `;
  }
}
