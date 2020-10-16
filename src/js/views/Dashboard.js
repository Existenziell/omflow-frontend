import AbstractView from "./AbstractView.js";
import User from './dashboard/User.js';
import { AdminSpace } from './dashboard/AdminSpace.js';
import { ClassesList } from "./dashboard/ClassesList.js";
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

    formBtn.onclick = (e) => {
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
    }
  }

  createPractice = () => {
    const form = document.getElementById('create-class');

    form.onsubmit = (e) => {
      e.preventDefault();
      let name = document.querySelector('.practice-name').value;
      let description = document.querySelector('.practice-description').value;
      let duration = document.querySelector('.practice-duration').value;
      let teacher = document.querySelector('.practice-teacher').value;
      let style = document.querySelector('.practice-style').value;
      let level = document.querySelector('.practice-level').value;
      let date;
      document.querySelector('.practice-date').value === '' ?
        date = Date.now() :
        date = Date.parse(document.querySelector('.practice-date').value);

      let formData = {
        name: name,
        description: description,
        date: date,
        duration: duration,
        teacher: teacher,
        style: style,
        level: level
      }

      axios.post(form.action, formData, { headers: { "x-auth-token": this.token } })
        .then(response => {
          // history.pushState(null, null, '/dashboard');
          history.back();
        })
        .catch(error => console.error('error'));
    }
  }

  editPractice = () => {
    const form = document.getElementById('edit-class');

    form.onsubmit = (e) => {
      e.preventDefault();
      let name = document.querySelector('.practice-name').value;
      let description = document.querySelector('.practice-description').value;
      let duration = document.querySelector('.practice-duration').value;
      let style = document.querySelector('.practice-style').value;
      let level = document.querySelector('.practice-level').value;
      let date;
      document.querySelector('.practice-date').value === '' ?
        date = Date.now() :
        date = Date.parse(document.querySelector('.practice-date').value);

      let formData = {
        name: name,
        description: description,
        date: date,
        duration: duration,
        style: style,
        level: level
      }
      axios.post(form.action, formData, { headers: { "x-auth-token": this.token } })
        .then(response => {
          history.back();
        })
        .catch(error => console.error(error));
    }
  }

  deletePractice = async () => {
    const deleteBtns = document.querySelectorAll('.delete-practice');

    for (let button of deleteBtns) {
      button.onclick = (async (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        axios.delete(`${process.env.API_URL}/practices/${id}`, { headers: { "x-auth-token": this.token } })
          .then(async response => {
            location.reload();
          })
          .catch(error => console.error(error));
      })
    }
  }

  // https://bootstrap-datepicker.readthedocs.io/en/latest/
  initDatetimePicker = () => {
    $('.datetimepicker').datetimepicker().data('datetimepicker');
  }

  getHtml = async () => {
    let practices = await (await fetch(`${process.env.API_URL}/practices/`)).json();
    const isLoggedIn = await new User().isLoggedIn();

    const teacherData = await new User().getTeacherData();
    const role = teacherData.role

    if (role === 'teacher') {
      practices = teacherData.practices;
    }

    if (!isLoggedIn) return `<div class="not-logged-in">Please login to access this page</div>`;

    return `
      ${role === 'user' ? await new User().getHtml() : ''}
      ${role === 'teacher' ? await ClassesList(practices) : ''}
      ${role === 'admin' ? await AdminSpace(role) : ''}
    `;
  }
}
