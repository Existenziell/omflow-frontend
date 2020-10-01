const initDashboardEdit = () => {
  editPractice();
  deletePractice();
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
        history.back();
      })
      .catch(error => console.error('error'));
  });
}

const deletePractice = () => {
  // const deleteBtn = $('.delete-practice');
  // console.log(deleteBtn);

  $('.delete-practice').on("click", (e) => {
    e.preventDefault();
    console.log(e);
    axios.delete(e, formData)
      .then(response => {
        history.back();
      })
      .catch(error => console.error('error'));
  });
}

const initDashboard = () => {
}

export { initDashboard, initDashboardEdit }
