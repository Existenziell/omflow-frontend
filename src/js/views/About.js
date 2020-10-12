import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("About");
  }

  async getHtml() {
    return `
      <link rel="stylesheet" type="text/css" href="/css/about.css" />
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
            <img src="/img/about.jpg" />
          </div>
        </section>
        <hr />
        <section class="testimonial">
          <h2>CLICK BELOW TO HEAR A MESSAGE FROM OMFLOW TEACHERS</h2>
          <iframe src="https://player.vimeo.com/video/430023667?app_id=122963&amp;wmode=opaque" width="426" height="240" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="" title="Omflow Unity Ad Video" id="yui_3_17_2_1_1602524991078_74"></iframe>
        </section>
        <hr />
      </div>
    `;
  }
}
