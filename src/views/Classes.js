import AbstractView from "./AbstractView.js";
import axios from 'axios';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Classes");
    this.classId = 2;
  }

  async getHtml() {

    const practices = await (await fetch('http://localhost:5000/practices/')).json();
    const newData = practices.map((p) => {
      console.log(p.name);
      return p.name;
    })
    console.log(newData);

    return newData;
    // return this.html();
  }


  html = () => {
    return `
      <div>
        <h3>Practices</h3>
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
            <tr>
              <td></td>
              <td></td>
              <td>{props.practice.teacher.name}</td>
              <td>{props.practice.duration}</td>
              <td>{props.practice.date.substring(0, 10)}</td>
              <td>
                <a href"/dashboard/practice/edit/${this.classId}" data-link>edit</a> | <a href="#" onClick="${() => { this.deletePractice(this.classId) }}">delete</a>
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/dashboard/practice/create" className="btn btn-secondary">Create Class</Link>
      </div>
    `
  }

  loadPractices = async () => {
    axios.get('http://localhost:5000/practices/')
      .then(response => {
        return response.data
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePractice = (id) => {
    axios.delete('http://localhost:5000/practices/' + id)
      .then(response => { console.log(response.data) });
    this.setState({
      practices: this.state.practices.filter(el => el._id !== id) // _id comes from MongoDB
    })
  }

}
