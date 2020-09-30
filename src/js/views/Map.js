import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Map");
  }

  async getHtml() {
    return `
      <div id="overlay">
        <div class="overlay-button overlay-hide">
          <a href="/" data-link>LOCATE AN OMIE</a>
        </div>
        <div class="overlay-button">
          <a href="/matchme" data-link>LET'S OMFLOW</a>
        </div>
      </div>
      <a href="/" class="back-home back-home-white" name="back-home" data-link></a>
      <div id="map"></div>
    `;
  }
}
