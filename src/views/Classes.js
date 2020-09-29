import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Classes");
    this.practices = [];
  }

  async getHtml() {
    const practices = await (await fetch('http://localhost:5000/practices/')).json();
    const newData = practices.map((p) => {
      return p;
    })
    this.practices = newData;
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
              <td>${p.date.substring(0, 10)}</td>
              <td>
                <a href="/classes/${p._id}" class="btn btn-sm btn-outline-info" data-link>view</a> |
                <a href="/classes/edit/${p._id}" class="btn btn-sm btn-outline-info" data-link>edit</a> |
                <a href="/classes/practice/delete/${p._id}" class="btn btn-sm btn-outline-info" data-link>delete</a>
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

  // loadPractices = async () => {
  //   axios.get('http://localhost:5000/practices/')
  //     .then(response => {
  //       return response.data
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }

  // deletePractice = (id) => {
  //   axios.delete('http://localhost:5000/practices/' + id)
  //     .then(response => { console.log(response.data) });
  //   this.setState({
  //     practices: this.state.practices.filter(el => el._id !== id) // _id comes from MongoDB
  //   })
  // }

}
