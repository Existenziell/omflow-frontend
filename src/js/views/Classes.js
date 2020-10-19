import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Classes");
    this.practices = [];
  }

  getHtml = async () => {
    this.practices = await (await fetch(`${process.env.API_URL}/practices/`)).json();
    return this.html();
  }

  html = () => {
    let output = `
      <div>
        <h3>Available Classes</h3>
        <table class="table table-hover table-condensed">
          <thead class="thead-light">
            <tr>
              <th>Style</th>
              <th>Level</th>
              <th>Teacher</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
    `;
    for (let p of this.practices) {
      output += `
            <tr>
              <td>${p.style.identifier}</td>
              <td>${p.level.identifier}</td>
              <td>${p.teacher.name}</td>
\              <td>${p.description}</td>
              <td>${p.duration}</td>
              <td>${moment(p.date).format("MMMM Do YYYY")}</td>
              <td>${moment(p.date).format("h:mm a")}</td>
              <td>${p.price.toFixed(2)} $</td>
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
