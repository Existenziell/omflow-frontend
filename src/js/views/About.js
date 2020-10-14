import AbstractView from "./AbstractView.js";
import '../../scss/about.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("About");
  }

  async getHtml() {
    return `
      <div class="about">
        <section class="header">
          <h1>About</h1>
        </section>
        <section class="quote">
          <p>Inspired by the practice of yoga through the connection of self, breath and body, Omflow is an online global yoga community committed to spreading more mindfulness in the world by making yoga more accessible.</p>
          <small> - Caroline Vo, Founder & Chief Executive Yogi</small>
        </section>
        <hr />
        <section class="bio">
          <div class="bio-text">
            <h2>WHO IS OMFLOW</h2>
            <p>Founded by first generation Vietnamese American, Caroline Vo in May 2019, Omflow is a community of like-minded individuals looking to better the world through the practice of yoga.</p>
            <p>Utilizing technology to make yoga more accessible worldwide, the Omflow Community is dedicated to developing the first-ever 24-hour online yoga studio that simulates an in-person experience from the comfort of a student’s home—no recordings, completely interactive, and always in real-time.</p>
            <p>With 16 certified yoga teachers from all over the world, Omflow is in its first phase of development. We welcome you into our community and hope that you will join us on the yoga mat soon!</p>
          </div>
          <div class="bio-img">
            <img src="/img/layout/about.jpg" />
          </div>
        </section>
        <hr />
      </div>
    `;
  }
}
