import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle(`Dashboard | Create teacher`);

    this.allStyles = {};
    this.allLevels = {};
  }

  getHtml = async () => {
    this.allStyles = await (await fetch(`${process.env.API_URL}/practices/styles/`)).json();
    this.allLevels = await (await fetch(`${process.env.API_URL}/practices/levels/`)).json();
    return this.html();
  }

  html = () => {
    let output = `
      <div class="admin-create-teacher">
        <h3>Create Teacher</h3>

        <form id="admin-create-teacher" action="${process.env.API_URL}/teachers/create/" method="POST">

          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control teacher-name" required />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea class="form-control teacher-description"></textarea>
          </div>

          <div class="form-group">
            <label for="teacher-styles">Styles:</label>
            <select multiple class="form-control" id="teacher-styles">
              ${this.allStyles.map((item) => `
                <option value="${item._id}">${item.identifier}</option>
              ` )}
            </select>
          </div>

          <div class="form-group">
            <label for="teacher-levels">Levels:</label>
            <select multiple class="form-control" id="teacher-levels">
              ${this.allLevels.map((item) => `
                <option value="${item._id}">${item.identifier}</option>
              ` )}
            </select>
          </div>

          <div class="form-group">
            <label>Location/Address:</label>
            <input type="text" class="form-control teacher-address" />
          </div>
          <div class="form-group">
            <label>Coordinates (Longitude):</label>
            <input type="number" class="form-control teacher-coordinates" required />
          </div>
          <div class="form-group">
            <label>Coordinates (Latitude):</label>
            <input type="number" class="form-control teacher-coordinates" required />
          </div>
          <div class="form-group">
            <label>Quote:</label>
            <input type="text" class="form-control teacher-quote" />
          </div>
          <div class="form-group">
            <label>Instagram:</label>
            <input type="text" class="form-control teacher-instagram" />
          </div>
          <div class="form-group">
            <label>Preferred pose:</label>
            <input type="text" class="form-control teacher-pose" />
          </div>

          <div class="form-group">
            <input type="submit" id="admin-save-teacher" class="btn btn-sm btn-outline-info" value="Save" />
            <a href="/dashboard" value="Cancel" class="btn btn-link" data-link>Cancel</a>
          </div>

        </form>
      </div>
    `;
    return output;
  }
}
