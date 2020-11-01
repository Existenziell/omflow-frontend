import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle(`Dashboard | Edit Class`);

    this.practiceId = params.id;
    this.practice = {};
    this.styles = {};
    this.levels = {};
  }

  getHtml = async () => {
    this.practice = await (await fetch(`${process.env.API_URL}/practices/${this.practiceId}`)).json();
    this.styles = await (await fetch(`${process.env.API_URL}/practices/styles/`)).json();
    this.levels = await (await fetch(`${process.env.API_URL}/practices/levels/`)).json();
    return this.html();
  }

  html = () => {
    const { id, description, duration, date, level, style, price } = this.practice;

    let output = `
      <div>
        <h3>Edit Class</h3>

        <form id="edit-class" action="${process.env.API_URL}/practices/update/${this.practiceId}" method="POST">
          <div class="form-group">
            <label for="style-dropdown">Style:</label>
            <select id="styleSelect" class="form-control practice-style">
            ${this.styles.map((item) => `
              <option value="${item._id}" ${item.identifier === style.identifier ? `selected` : ``}>${item.identifier}</option>
            `)}
            </select>
          </div>
          <div class="form-group">
            <label for="level-dropdown">Level:</label>
            <select class="form-control practice-level">
            ${this.levels.map((item) => `
              <option value="${item._id}" ${item.identifier === level.identifier ? `selected` : ``}>${item.identifier}</option>
            `)}
            </select>
          </div>
          <div class="form-group">
            <label>Details:</label>
            <input type="text" class="form-control practice-description" value="${description}" />
          </div>
          <div class="form-group">
            <label>Duration (in minutes):</label>
            <input type="text" class="form-control practice-duration" id="duration" value="${duration}" />
          </div>
          <div class="form-group">
            <label>Date:</label>
            <div>
              <div class="input-group date" data-provide="datetimepicker">
                <input type="text" class="form-control practice-date datetimepicker" value="${moment(date).format("YYYY/MM/D hh:mm")}">
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Price (in USD):</label>
            <input type="number" class="form-control practice-price" value="${price.toFixed(2)}" />
          </div>

          <div class="form-group">
            <input type="submit" id="save-practice" class="btn btn-outline-info" value="Save" />
            <a href="/dashboard" value="Cancel" class="btn btn-outline-secondary" data-link>Cancel</a>
          </div>

        </form>
      </div>
    `;
    return output;
  }
}
