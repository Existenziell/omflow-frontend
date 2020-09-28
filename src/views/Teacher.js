import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.teacherId = params.id;
    this.setTitle(`Teacher #${this.teacherId}`);
  }

  async getHtml() {
    return `
            <h1>Teacher</h1>
            <p>You are viewing teacher with #${this.teacherId}.</p>
        `;
  }
}
