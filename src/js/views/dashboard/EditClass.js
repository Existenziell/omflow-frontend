import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.practiceId = params.id;
    this.practice = {};
    this.setTitle(`Dashboard | Edit class ${params.id}`);
  }

  async getHtml() {
    this.practice = await (await fetch(`http://localhost:5000/practices/${this.practiceId}`)).json();
    return this.html();
  }

  html = () => {
    let output = `
      <div>
        <h3>Edit Class</h3>
        <form id="edit-class" action="http://localhost:5000/practices/update/${this.practiceId}" method="POST">
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
              <div class="datetimepicker_wrapper">
                <input type="text" class="datetimepicker" value="Select Date" />
                <select class="form-control  practice-date"></select>
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
