import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
  }

  getHtml = async () => {
    return `
        <div class="footer-copyright text-center py-2">© 2020 Copyright:
          <a href="https://omflow.yoga/">Omflow</a>
        </div>
    `;
  }
}
