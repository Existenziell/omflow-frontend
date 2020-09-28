import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Navigation");
  }

  async getHtml() {
    return `
      <nav class="nav">
        <a href="/" class="nav__link" data-link>Home</a>
        <a href="/map" class="nav__link" data-link>Map</a>
        <a href="/teachers" class="nav__link" data-link>Teachers</a>
        <a href="/classes" class="nav__link" data-link>Classes</a>
        <a href="/matchme" class="nav__link" data-link>MatchMe</a>
        <a href="/dashboard" class="nav__link" data-link>Dashboard</a>
      </nav>
    `;
  }
}
