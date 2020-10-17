import axios from 'axios';

const createPractice = (token) => {
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

    let formData = { name, description, date, duration, teacher, style, level }

    axios.post(form.action, formData, { headers: { "x-auth-token": token } })
      .then(() => history.back())
      .catch(error => console.error(error));
  }
}

const editPractice = (token) => {
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

    let formData = { name, description, date, duration, style, level }

    axios.post(form.action, formData, { headers: { "x-auth-token": token } })
      .then(response => {
        history.back();
      })
      .catch(error => console.error(error));
  }
}

const deletePractice = async (token) => {
  const deleteBtns = document.querySelectorAll('.delete-practice');

  for (let button of deleteBtns) {
    button.onclick = (async (e) => {
      e.preventDefault();
      const id = e.target.getAttribute('data-id');
      axios.delete(`${process.env.API_URL}/practices/${id}`, { headers: { "x-auth-token": token } })
        .then(async response => {
          location.reload();
        })
        .catch(error => console.error(error));
    })
  }
}

const editUser = (token) => {
  const form = document.getElementById('edit-user');
  const formBtn = document.getElementById('save-user');
  if (!formBtn) return false;

  formBtn.onclick = (e) => {
    e.preventDefault();
    let name = document.querySelector('.user-name').value;
    let email = document.querySelector('.user-email').value;
    let location = document.querySelector('.user-location').value;

    let formData = { name, email, location }

    axios.post(form.action, formData, { headers: { "x-auth-token": token } })
      .then(response => {
        const msg = document.querySelector(".server-msg");
        msg.style.display = 'block';
        msg.innerHTML = response.data;
      })
      .catch(error => console.error(error));
  }
}

const setActiveNavItem = () => {
  let links = [...document.querySelectorAll('.nav-link')];  // Convert from NodeList to Arrat by spreading
  for (let link of links) {
    if (link.getAttribute("href") === location.pathname) {
      link.classList.add('active');
    }
  }
}

// https://bootstrap-datepicker.readthedocs.io/en/latest/
const initDatetimePicker = () => {
  $('.datetimepicker').datetimepicker().data('datetimepicker');
}

export { createPractice, editPractice, deletePractice, editUser, setActiveNavItem, initDatetimePicker }
