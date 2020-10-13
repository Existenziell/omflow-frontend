import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.practiceId = params.id;
    this.practice = {};
  }

  async getHtml() {
    this.practice = await (await fetch(`${process.env.API_URL}/practices/${this.practiceId}`)).json();
    this.setTitle(`Dashboard | Edit ${this.practice.name}`);
    return this.html();
  }

  html = () => {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    let output = `
      <div>
        <h3>Edit Class</h3>
        <form id="edit-class" action="${process.env.API_URL}/practices/update/${this.practiceId}" method="POST">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" required class="form-control practice-name" value="${this.practice.name}" />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <input type="text" required class="form-control practice-description" value="${this.practice.description}" />
          </div>
          <div class="form-group">
            <label>Duration (in minutes):</label>
            <input type="text" class="form-control practice-duration" id="duration" value="${this.practice.duration}" />
          </div>
          <div class="form-group">
            <label>Date:</label>
            <div>
              <div class="input-group date" data-provide="datetimepicker">
                <input type="text" class="form-control practice-date datetimepicker" value="${new Date(this.practice.date).toLocaleDateString("en-US", options)}">
              </div>
            </div>
          </div>
          <div class="form-group">
            <a href="" id="saveFormBtn" class="btn btn-primary">Save</a>
            <a href="/dashboard" value="Cancel" class="btn btn-link" data-link>Cancel</a>
          </div>
        </form>
      </div>
    `;
    return output;
  }

}
