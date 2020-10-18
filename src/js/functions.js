import axios from 'axios';

const editTeacher = (token) => {
  const form = document.getElementById('edit-teacher');
  const formBtn = document.getElementById('save-teacher');
  if (!formBtn) return false;

  formBtn.onclick = (e) => {
    e.preventDefault();
    const name = document.querySelector('.teacher-name').value;
    const description = document.querySelector('.teacher-description').value;
    const address = document.querySelector('.teacher-address').value;
    const quote = document.querySelector('.teacher-quote').value;
    const instagram = document.querySelector('.teacher-instagram').value;
    const pose = document.querySelector('.teacher-pose').value;
    const formData = { name, description, address, quote, instagram, pose }

    axios.post(form.action, formData, { headers: { "x-auth-token": token } })
      .then((res) => displayServerMsg(res.data))
      .catch(error => displayServerMsg(error.response.data.msg, true));
  }
}

const createPractice = (token) => {
  const form = document.getElementById('create-class');

  form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector('.practice-name').value;
    const description = document.querySelector('.practice-description').value;
    const duration = document.querySelector('.practice-duration').value;
    const teacher = document.querySelector('.practice-teacher').value;
    const style = document.querySelector('.practice-style').value;
    const level = document.querySelector('.practice-level').value;
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
    const name = document.querySelector('.practice-name').value;
    const description = document.querySelector('.practice-description').value;
    const duration = document.querySelector('.practice-duration').value;
    const style = document.querySelector('.practice-style').value;
    const level = document.querySelector('.practice-level').value;
    let date;
    document.querySelector('.practice-date').value === '' ?
      date = Date.now() :
      date = Date.parse(document.querySelector('.practice-date').value);

    const formData = { name, description, date, duration, style, level }

    axios.post(form.action, formData, { headers: { "x-auth-token": token } })
      .then(() => history.back())
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
        .then(() => location.reload())
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
    const name = document.querySelector('.user-name').value;
    const email = document.querySelector('.user-email').value;
    const location = document.querySelector('.user-location').value;
    const formData = { name, email, location }

    axios.post(form.action, formData, { headers: { "x-auth-token": token } })
      .then((res) => displayServerMsg(res.data))
      .catch(error => displayServerMsg(error.response.data.msg, true));
  }
}

const deleteUser = (token) => {
  const deleteBtns = document.querySelectorAll('.delete-user');
  for (let button of deleteBtns) {
    button.onclick = ((e) => {
      e.preventDefault();
      const id = e.target.getAttribute('data-id');
      axios.delete(`${process.env.API_URL}/users/${id}`, { headers: { "x-auth-token": token } })
        .then(() => location.reload())
        .catch(error => console.error(error));
    })
  }
}

const setActiveNavItem = () => {
  const links = [...document.querySelectorAll('.nav-link')];  // Convert from NodeList to Arrat by spreading
  for (let link of links) {
    if (link.getAttribute("href") === location.pathname) {
      link.classList.add('active');
    }
  }
}

const displayServerMsg = (msg, isError) => {
  const target = document.querySelector(".server-msg");
  target.style.display = 'block';
  if (isError) target.classList.add('server-msg-error');
  target.innerHTML = msg;
}

// https://bootstrap-datepicker.readthedocs.io/en/latest/
const initDatetimePicker = () => {
  $('.datetimepicker').datetimepicker().data('datetimepicker');
}

export {
  createPractice, editPractice, deletePractice,
  editUser, deleteUser,
  editTeacher,
  setActiveNavItem, initDatetimePicker
}
