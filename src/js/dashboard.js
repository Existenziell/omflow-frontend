const createPractice = () => {
  const form = document.getElementById('create-class');
  const formBtn = document.getElementById('saveFormBtn');
  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.querySelector('.practice-name').value;
    let description = document.querySelector('.practice-description').value;
    let duration = document.querySelector('.practice-duration').value;
    let date = document.querySelector('.practice-date').value;
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
        // location.reload();
        window.location = '/dashboard';
        // history.back();
      })
      .catch(error => console.error('error'));
  });
}

const editPractice = () => {
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
        location.reload();
        // history.back();
      })
      .catch(error => console.error('error'));
  });
}

const deletePractice = () => {
  const deleteBtns = document.querySelectorAll('.delete-practice');
  for (let button of deleteBtns) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.getAttribute('data-id');
      axios.delete(`http://localhost:5000/practices/${id}`)
        .then(response => {
          // history.back();
          location.reload();
        })
        .catch(error => console.error('error'));
    });
  }
}

export { createPractice, editPractice, deletePractice }
