import AbstractView from "./AbstractView.js";
import User from './User.js';
import axios from 'axios';
import '../../scss/dashboard.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Dashboard");
    this.token = window.localStorage.getItem("auth-token");
  }

  editUser = () => {
    const form = document.getElementById('edit-user');
    const formBtn = document.getElementById('save-user');

    if (!formBtn) return false;
    formBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let name = document.querySelector('.user-name').value;
      let email = document.querySelector('.user-email').value;
      let location = document.querySelector('.user-location').value;

      let formData = {
        name,
        email,
        location
      }

      axios.post(form.action, formData, { headers: { "x-auth-token": this.token } })
        .then(response => {
          const msg = document.querySelector(".server-msg");
          msg.style.display = 'block';
          msg.innerHTML = response.data;
        })
        .catch(error => console.error('error'));
    });
  }

  createPractice = () => {
    const form = document.getElementById('create-class');
    const formBtn = document.getElementById('save-practice');
    formBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let name = document.querySelector('.practice-name').value;
      let description = document.querySelector('.practice-description').value;
      let duration = document.querySelector('.practice-duration').value;
      let date;
      document.querySelector('.practice-date').value === '' ?
        date = Date.now() :
        date = Date.parse(document.querySelector('.practice-date').value);

      let teacher = '5f6f5ae599d33f0e4e6f77b6'; // ToDo: REMOVE
      let formData = {
        name: name,
        description: description,
        date: date,
        duration: duration,
        teacher: teacher,
      }

      axios.post(form.action, formData, { headers: { "x-auth-token": this.token } })
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
    const formBtn = document.getElementById('save-practice');

    formBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let name = document.querySelector('.practice-name').value;
      let description = document.querySelector('.practice-description').value;
      let duration = document.querySelector('.practice-duration').value;
      let date;
      document.querySelector('.practice-date').value === '' ?
        date = Date.now() :
        date = Date.parse(document.querySelector('.practice-date').value);

      let formData = {
        name: name,
        description: description,
        date: date,
        duration: duration
      }
      axios.post(form.action, formData, { headers: { "x-auth-token": this.token } })
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
        axios.delete(`${process.env.API_URL}/practices/${id}`, { headers: { "x-auth-token": this.token } })
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

  async getHtml() {
    const isLoggedIn = await new User().isLoggedIn();
    if (!isLoggedIn) return `<div class="not-logged-in">Please login to access this page</div>`;
    return `
      ${await new User().getHtml()}
    `;
  }
}
