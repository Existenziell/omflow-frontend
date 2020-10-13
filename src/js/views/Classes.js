import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Classes");
    this.practices = [];
    this.options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  }

  async getHtml({ practices }) {
    this.practices = practices;
    return this.html();
  }

  html = () => {
    let output = `
      <div>
        <h3>Available Classes</h3>
        <table class="table table-hover table-condensed">
          <thead class="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Teacher</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
    `;
    for (let p of this.practices) {
      output += `
            <tr>
              <td>${p.name}</td>
              <td>${p.description}</td>
              <td>${p.teacher.name}</td>
              <td>${p.duration}</td>
              <td>${new Date(p.date).toLocaleDateString("en-US", this.options)}</td>
              <td>
                <a href="/classes/${p._id}" class="btn btn-sm btn-outline-info" data-link>view</a>
              </td>
            </tr>
      `;
    }
    output += `
          </tbody>
        </table>
      </div>
    `;
    return output;
  }
}
