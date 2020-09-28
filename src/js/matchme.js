import { log } from './modules'


const data = {
  style: "",
  level: "",
  type: "",
  date: "",
  budget: 0
}

const initForm = () => {
  log("initForm");
  initFormNavigation();
  initDateTimeZone();
  initBudgetForm();
  initInfoPopups();
  initLoginOverlay();
  $("#step-1").fadeIn();
}

const initFormNavigation = () => {
  // Handle clicks on options list and save in data
  $('.options-list li').on('click', (e) => {
    $(e.currentTarget).closest('.options-list').find("li").removeClass('border');
    $(e.currentTarget).addClass('border');
    //saveData(e);
  });

  // Handle previous step
  $(".prev-step").on("click", (e) => {
    navigateToStep(e);
    e.preventDefault();
  });

  // Handle next step - save data to data object
  $(".next-step").on('click', (e) => {
    saveData(e);
    navigateToStep(e);
    e.preventDefault();
  });

  $('.unsure').on('click', (e) => {
    navigateToStep(e);
    e.preventDefault();
  });
}

const saveData = (e) => {
  var id = $(e.target).data('current');
  if (id == 4) {   // Datetime
    data.date = $('.datetimepicker').datetimepicker('getValue');
  } else if (id == 5) {    // Budget
    data.budget = $('.budget-input').val();
    setReviewValues();
  } else if (id == 6) {    // Review
    return;
  } else {    // All other IDs
    const choice = $(`#step-${id}`).find('li.border');
    var key = $(`#step-${id}`).closest(".matchme-form").data("key");
    var value = $(choice).find("span.option").text();
    data[key] = value;
  }
}

const navigateToStep = (e) => {
  $(".matchme-form").hide();
  var id = $(e.target).data('target');
  var target = `#step-${id}`;
  $(target).fadeIn();
}

const setReviewValues = () => {
  const dateFormatted = data.date ?
    $.format.date(data.date, "ddd, MMMM D, yyyy") :
    $.format.date(new Date(), "ddd, MMMM D, yyyy");
  const timeFormatted = data.time ?
    $.format.date(data.date, "HH:mm") :
    $.format.date(new Date(), "HH:mm");
  $(".review-style").text(data.style || 'Not set');
  $(".review-level").text(data.level || 'Not set');
  $(".review-type").text(data.type || 'Not set');
  $(".review-date").text(dateFormatted);
  $(".review-time").text(timeFormatted);
  $(".review-budget").text(`${data.budget} USD`);
  initChangeHandlers();
  initOmflowConnect();
}

const initDateTimeZone = () => {
  // Call datetimepicker plugin
  $(".datetimepicker").datetimepicker({
    // yearStart: 2020,
    // step: 15,
    // dayOfWeekStart: 1,
    // showApplyButton: false,
    minDate: new Date()
  });
  // Call timezones plugin
  // $('select').timezones();
}

const initChangeHandlers = () => {
  $(".review-entry-link").on("click", (e) => {
    $(".matchme-form").hide();
    const target = "#step-" + $(e.target).data("key");
    $(target).show();
    return false;
  });
}

const initBudgetForm = () => {
  $('.budget-input').on('change keyup', (e) => {
    let budget = $(e.target).val();
    // Limit input to 2 numbers
    if (budget.length > 2) {
      budget = budget.toString().slice(0, -1);
    }
    // Remove invalid characters
    budget = budget.replace(/[^0-9]/g, '');
    $(e.target).val(parseInt(budget));
  });
}

const initInfoPopups = () => {
  $(".learn-more").on("mouseenter mouseleave", function () {
    $(this).closest("li").find('.popup').toggleClass("show");
  });
}

const initLoginOverlay = () => {
  const loginOverlay = $("#login-overlay");
  $(".show-login-layer").on("click", (e) => {
    loginOverlay.css('display', 'flex');
    e.preventDefault();
  });

  $('.login-close').on('click', (e) => {
    loginOverlay.hide();
    e.preventDefault();
  });
}

const initOmflowConnect = () => {
  $('#omflow-connect').on('click', (e) => {
    const loader = $('.loader');
    $('.loader').addClass('is-active');
    $('.matched-results').html('');

    fetch('http://localhost:3000/teachers/match')
      .then(response => response.json())
      .then(teachers => {
        loader.removeClass('is-active');
        teachers.forEach(teacher => {
          const { name, location, email, picture } = teacher;
          $('.matched-results')
            .append(`
                    <li>
                        <h2>${name}</h2>
                        <span>${location}</span>
                        <img src="${picture}" alt="${name}" />
                        <a href='teachers.html'>Let's Omflow!</a>
                    </li>`);
        })
      });
    e.preventDefault();
  });
}

export { initForm }
