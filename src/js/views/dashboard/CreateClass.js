import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle(`Dashboard | Create class`);
  }

  async getHtml() {
    return this.html();
  }

  html = () => {
    let output = `
      <div>
        <h3>Create Class</h3>
        <form id="create-class" action="${process.env.API_URL}/practices/create" method="POST">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" required class="form-control practice-name" value="" />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <input type="text" required class="form-control practice-description" value="" />
          </div>
          <div class="form-group">
            <label>Duration (in minutes):</label>
            <input type="number" required class="form-control practice-duration" id="duration" value="" />
          </div>
          <div class="form-group">
            <label>Date:</label>
            <div>
              <div class="input-group date" data-provide="datetimepicker">
                <input type="text" class="form-control practice-date datetimepicker">
              </div>
            </div>
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
