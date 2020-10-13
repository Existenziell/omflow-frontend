import AbstractView from "./AbstractView.js";
import '../../scss/map.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Map");
  }

  async getHtml() {
    return `
      <div id="overlay">
        <div class="overlay-button overlay-hide">
          <a href="/" data-link>Locate an Omie</a>
        </div>
        <div class="overlay-button">
          <a href="/matchme" data-link>Let's Omflow</a>
        </div>
      </div>
      <a href="/" class="back-home back-home-white" name="back-home" data-link></a>
      <div id="map"></div>
    `;
  }
}
