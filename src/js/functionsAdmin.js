import axios from 'axios';

const adminCreateTeacher = (token) => {
  const form = document.getElementById('admin-create-teacher');

  form.onsubmit = async (e) => {
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

    const file = document.querySelector('#file');
    const image = file.files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("tag", tag);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("quote", quote);
    formData.append("instagram", instagram);
    formData.append("pose", pose);
    formData.append("file", image);

    const response = await axios.post(form.action, formData, { headers: { "x-auth-token": token } });

    if (response) {
      displayServerMsg(response.data);
      history.back();
    }
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
  const loader = document.getElementById('loader');
  loader.classList.remove("is-active");
  const target = document.querySelector(".server-msg");
  target.style.display = 'block';
  if (isError) target.classList.add('server-msg-error');
  target.innerHTML = msg;
}

const initUpload = (token) => {

  const imageField = document.getElementById('file');
  const imageContainer = document.getElementById('imageContainer');
  const errorMessage = document.getElementById('errorMessage');
  const successMessage = document.getElementById('successMessage');
  const clearImageLink = document.getElementById('clearImage');
  // let fileName = "";

  [
    'drag',
    'dragstart',
    'dragend',
    'dragover',
    'dragenter',
    'dragleave',
    'drop'
  ].forEach(function (dragEvent) {
    imageContainer.addEventListener(dragEvent, preventDragDefault);
  });

  ['dragover', 'dragenter'].forEach(function (dragEvent) {
    imageContainer.addEventListener(dragEvent, function () {
      imageContainer.classList.add('dragging');
    })
  });

  ['dragleave', 'dragend', 'drop'].forEach(function (dragEvent) {
    imageContainer.addEventListener(dragEvent, function () {
      imageContainer.classList.remove('dragging');
    })
  });

  imageContainer.addEventListener('drop', function (e) {
    if (e.dataTransfer.files.length > 1) {
      errorMessage.innerHTML = "Drag only one file...";
      errorMessage.classList.remove('hide');
      return false;
    }

    // Casting fileList to Array before assigning
    const fileList = Array.from(e.dataTransfer.files);
    const file = fileList[0];
    const imageFieldFiles = Array.from(imageField.files);
    imageFieldFiles[0] = file;

    if (checkFileProperties(file)) {
      handleUploadedFile(file);
    }
  })

  imageField.onchange = function (e) {
    let file = e.target.files[0];

    if (checkFileProperties(file)) {
      handleUploadedFile(file);
    }
  }

  function checkFileProperties(file) {
    errorMessage.classList.add('hide');
    successMessage.classList.add('hide');

    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (file.size > 5000000) {
      errorMessage.innerHTML = "File too large, cannot be more than 5MB";
      errorMessage.classList.remove('hide');
      return false;
    }
    return true;
  }

  clearImageLink.onclick = clearImage;
  function preventDragDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleUploadedFile(file) {
    // fileName = file.name;
    clearImage();
    const img = document.createElement("img");
    img.setAttribute('id', 'imageTag');
    img.file = file;
    imageContainer.appendChild(img);

    let reader = new FileReader();
    reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }

  function clearImage(e) {
    if (e) {
      e.preventDefault();
    }

    let theImageTag = document.querySelector('#imageTag');

    if (theImageTag) {
      imageContainer.removeChild(theImageTag);
      imageField.value = null;
    }

    errorMessage.classList.add('hide');
    successMessage.classList.add('hide');
  }
}


export { adminCreateTeacher, adminEditTeacher, initUpload }
