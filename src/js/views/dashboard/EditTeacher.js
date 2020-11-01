import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.teacherId = params.id;

    this.teacher = {};
    this.allStyles = {};
    this.allLevels = {};
  }

  getHtml = async () => {
    this.teacher = await (await fetch(`${process.env.API_URL}/teachers/${this.teacherId}`)).json();
    this.setTitle(`Dashboard | Edit ${this.teacher.name}`);
    this.allStyles = await (await fetch(`${process.env.API_URL}/practices/styles/`)).json();
    this.allLevels = await (await fetch(`${process.env.API_URL}/practices/levels/`)).json();
    return this.html();
  }

  html = () => {
    const {
      _id, name, description, address, coordinates, image, video, tag, levels, styles, quote, instagram, pose, userId
    } = this.teacher;
    const teacherLevels = levels.map(l => l._id);
    const teacherStyles = styles.map(s => s._id);

    let output = `
      <div class="admin-edit-teacher">
        <h3>Edit Teacher</h3>

        <form id="admin-edit-teacher" action="${process.env.API_URL}/teachers/edit/${_id}" method="POST">
          <div class="image-upload">
            <label for="file" id="imageContainer">
              <input type="file" id="file" name="file" accept="image/png, image/jpeg">
              <img src="${process.env.API_URL}/${image}" alt="${tag}" class="teacher-image" />
            </label>
            <p id="errorMessage" class="hide"></p>
            <p id="successMessage" class="hide"></p>
          </div>

          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control teacher-name" value="${name}" />
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea class="form-control teacher-description">${description}</textarea>
          </div>

          <div class="form-group">
            <label for="teacher-styles">Styles:</label>
            <select multiple class="form-control" id="teacher-styles">
              ${this.allStyles.map((item) => `
                <option value="${item._id}" ${teacherStyles.includes(item._id) ? `selected` : ``}>${item.identifier}</option>
              ` )}
            </select>
          </div>

          <div class="form-group">
            <label for="teacher-levels">Levels:</label>
            <select multiple class="form-control" id="teacher-levels">
              ${this.allLevels.map((item) => `
                <option value="${item._id}" ${teacherLevels.includes(item._id) ? `selected` : ``}>${item.identifier}</option>
              ` )}
            </select>
          </div>

          <div class="form-group">
            <label>Connected user:</label>
            <input type="text" class="form-control teacher-user" value="${userId}" />
          </div>
          <div class="form-group">
            <label>Address:</label>
            <input type="text" class="form-control teacher-address" value="${address}" />
          </div>
          <div class="form-group">
            <label>Coordinates (Longitude):</label>
            <input type="number" class="form-control teacher-coordinates" value="${coordinates[0]}" />
          </div>
          <div class="form-group">
            <label>Coordinates (Latitude):</label>
            <input type="number" class="form-control teacher-coordinates" value="${coordinates[1]}" />
          </div>
          <div class="form-group">
            <label>Quote:</label>
            <input type="text" class="form-control teacher-quote" value="${quote}" />
          </div>
          <div class="form-group">
            <label>Instagram:</label>
            <input type="text" class="form-control teacher-instagram" value="${instagram}" />
          </div>
          <div class="form-group">
            <label>Preferred pose:</label>
            <input type="text" class="form-control teacher-pose" value="${pose}" />
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
