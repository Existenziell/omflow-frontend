import axios from 'axios';

const adminCreateTeacher = (token) => {
  const form = document.getElementById('admin-create-teacher');

  form.onsubmit = (e) => {
    e.preventDefault();

    let levels = [...document.getElementById('teacher-levels').selectedOptions];
    levels = levels.map((l) => l.value);

    let styles = [...document.getElementById('teacher-styles').selectedOptions];
    styles = styles.map((l) => l.value);

    let coordinates = [...document.querySelectorAll('.teacher-coordinates')];
    coordinates = coordinates.map(c => Number(c.value));

    const name = document.querySelector('.teacher-name').value;
    const description = document.querySelector('.teacher-description').value;
    const address = document.querySelector('.teacher-address').value;
    const quote = document.querySelector('.teacher-quote').value;
    const instagram = document.querySelector('.teacher-instagram').value;
    const pose = document.querySelector('.teacher-pose').value;
    const tag = name.replace(/\s/g, '').toLowerCase();

    const formData = { name, levels, styles, description, address, quote, instagram, pose, coordinates, tag }
    axios.post(form.action, formData, { headers: { "x-auth-token": token } })
      .then((res) => history.back())
      .catch(error => displayServerMsg(error.response.data.msg, true));
  }
}

const adminEditTeacher = (token) => {
  const form = document.getElementById('admin-edit-teacher');
  const formBtn = document.getElementById('admin-save-teacher');
  if (!formBtn) return false;

  formBtn.onclick = (e) => {
    e.preventDefault();

    let levels = [...document.getElementById('teacher-levels').selectedOptions];
    levels = levels.map((l) => l.value);

    let styles = [...document.getElementById('teacher-styles').selectedOptions];
    styles = styles.map((l) => l.value);

    let coordinates = [...document.querySelectorAll('.teacher-coordinates')];
    coordinates = coordinates.map(c => Number(c.value));

    const name = document.querySelector('.teacher-name').value;
    const description = document.querySelector('.teacher-description').value;
    const address = document.querySelector('.teacher-address').value;
    const quote = document.querySelector('.teacher-quote').value;
    const instagram = document.querySelector('.teacher-instagram').value;
    const pose = document.querySelector('.teacher-pose').value;

    const formData = { name, levels, styles, description, address, quote, instagram, pose, coordinates }

    axios.post(form.action, formData, { headers: { "x-auth-token": token } })
      .then((res) => history.back())
      .catch(error => displayServerMsg(error.response.data.msg, true));
  }
}

const displayServerMsg = (msg, isError) => {
  const target = document.querySelector(".server-msg");
  target.style.display = 'block';
  if (isError) target.classList.add('server-msg-error');
  target.innerHTML = msg;
}

export { adminCreateTeacher, adminEditTeacher }
