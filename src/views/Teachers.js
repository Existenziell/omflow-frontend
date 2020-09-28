import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Teachers");
  }

  async getHtml() {
    return `
            <h1>Teachers</h1>
        `;
  }
}
