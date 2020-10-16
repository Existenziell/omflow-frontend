import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.practiceId = params.id;
    this.practice = {};
    this.styles = {};
    this.levels = {};
  }

  async getHtml() {
    this.practice = await (await fetch(`${process.env.API_URL}/practices/${this.practiceId}`)).json();
    this.styles = await (await fetch(`${process.env.API_URL}/practices/styles/`)).json();
    this.levels = await (await fetch(`${process.env.API_URL}/practices/levels/`)).json();
    this.setTitle(`Dashboard | Edit ${this.practice.name}`);
    return this.html();
  }

  html = () => {
    let output = `
      <div>
        <h3>Edit Class</h3>
        <form id="edit-class" action="${process.env.API_URL}/practices/update/${this.practiceId}" method="POST">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control practice-name" value="${this.practice.name}" required />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <input type="text" class="form-control practice-description" value="${this.practice.description}" required />
          </div>
          <div class="form-group">
            <label>Duration (in minutes):</label>
            <input type="text" class="form-control practice-duration" id="duration" value="${this.practice.duration}" />
          </div>
          <div class="form-group">
            <label>Date:</label>
            <div>
              <div class="input-group date" data-provide="datetimepicker">
                <input type="text" class="form-control practice-date datetimepicker" value="${moment(this.practice.date).format("MMMM Do YYYY, h:mm a")}">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="style-dropdown">Style:</label>
            <select id="styleSelect" class="form-control practice-style">
            ${this.styles.map((item) => `
              <option value="${item._id}" ${item.identifier === this.practice.style.identifier ? `selected` : ``}>${item.identifier}</option>
            `)}
            </select>
          </div>
          <div class="form-group">
            <label for="level-dropdown">Level:</label>
            <select class="form-control practice-level">
            ${this.levels.map((item) => `
              <option value="${item._id}" ${item.identifier === this.practice.level.identifier ? `selected` : ``}>${item.identifier}</option>
            `)}
            </select>
          </div>
          <div class="form-group">
            <input type="submit" id="save-practice" class="btn btn-primary" value="Save" />
            <a href="/dashboard" value="Cancel" class="btn btn-link" data-link>Cancel</a>
          </div>
        </form>
      </div>
    `;
    return output;
  }

}
