import AbstractView from "./AbstractView.js";
import { ClassesList } from "./dashboard/ClassesList.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml(data) {
    const { practices, teachers } = data;

    return `
      <h1>My Data</h1>
      <p>...</p>
      <h1>My Classes</h1>
        ${ClassesList(practices)}
    `;
  }
}
