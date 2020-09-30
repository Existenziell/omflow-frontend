import AbstractView from "./AbstractView.js";
import { getNav } from "./DashboardNav.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
      <h1>Dashboard</h1>
      ${getNav()}
    `;
  }
}
