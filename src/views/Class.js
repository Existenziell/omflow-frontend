import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.classId = params.id;
    this.setTitle("Classes");
  }

  async getHtml() {
    return `
            <h1>Class</h1>
            <p>You are viewing class with #${this.classId}.</p>
        `;
  }
}
