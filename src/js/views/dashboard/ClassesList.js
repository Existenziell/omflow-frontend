import AbstractView from "../AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard | Classes");
    this.practices = [];
  }

  async getHtml({ practices }) {
    this.practices = practices;
    return this.html();
  }

  html = () => {
    let output = `
      <div>
        <h3>Your Classes</h3>
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
              <td>${p.date.substring(0, 10)}</td>
              <td>
                <a href="/classes/${p._id}" class="btn btn-sm btn-outline-info" data-link>view</a> |
                <a href="/dashboard/classes/${p._id}" class="btn btn-sm btn-outline-info" data-link>edit</a> |
                <a href="/dashboard/classes/delete/${p._id}" class="btn btn-sm btn-outline-info" data-link>delete</a>
              </td>
            </tr>
      `;
    }
    output += `
          </tbody>
        </table>
        <a href="/dashboard/practices/create" class="btn btn-sm btn-outline-info" data-link>Create Class</a>
      </div>
    `;
    return output;
  }
}
