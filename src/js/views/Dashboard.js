import AbstractView from "./AbstractView.js";
import { ClassesList } from "./dashboard/ClassesList.js";
import axios from 'axios';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
  }

  createPractice = () => {
    const form = document.getElementById('create-class');
    const formBtn = document.getElementById('saveFormBtn');
    formBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let name = document.querySelector('.practice-name').value;
      let description = document.querySelector('.practice-description').value;
      let duration = document.querySelector('.practice-duration').value;
      let date = Date.parse(document.querySelector('.practice-date').value);
      if (date === '') date = new Date();
      let teacher = '5f6f59850098330d2e30e7b6';

      let formData = {
        name: name,
        description: description,
        date: date,
        duration: duration,
        teacher: teacher,
      }

      axios.post(form.action, formData)
        .then(response => {
          window.location = '/dashboard';
          // location.reload();
          // history.back();
        })
        .catch(error => console.error('error'));
    });
  }

  editPractice = () => {
    const form = document.getElementById('edit-class');
    const formBtn = document.getElementById('saveFormBtn');

    formBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let name = document.querySelector('.practice-name').value;
      let description = document.querySelector('.practice-description').value;
      let duration = document.querySelector('.practice-duration').value;
      let date = document.querySelector('.practice-date').value;
      if (date === '') date = new Date();

      let formData = {
        name: name,
        description: description,
        date: date,
        duration: duration
      }
      axios.post(form.action, formData)
        .then(response => {
          window.location = '/dashboard';
          // location.reload();
          // history.back();
        })
        .catch(error => console.error('error'));
    });
  }

  deletePractice = () => {
    const deleteBtns = document.querySelectorAll('.delete-practice');
    for (let button of deleteBtns) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        axios.delete(`${process.env.API_URL}/practices/${id}`)
          .then(response => {
            // history.back();
            location.reload();
          })
          .catch(error => console.error('error'));
      });
    }
  }

  // https://bootstrap-datepicker.readthedocs.io/en/latest/
  initDatetimePicker = () => {
    $('.datetimepicker').datetimepicker().data('datetimepicker');
  }

  async getHtml(data) {
    const { practices, teachers } = data;

    return `
      <h1>My Data</h1>
      <p>...</p>
      <h1>My Classes</h1>
        ${ClassesList(practices)}
    `;
  }
}
