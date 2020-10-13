import AbstractView from "./AbstractView.js";
import '../../scss/matchme.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("MatchMe");

    this.data = {
      style: "",
      level: "",
      type: "",
      date: "",
      budget: 0
    }
  }

  initForms = () => {
    this.initFormNavigation();
    this.initDateTimeZone();
    this.initBudgetForm();
    this.initInfoPopups();
    $("#step-1").fadeIn();
  }

  initFormNavigation = () => {
    // Handle clicks on options list and save in data
    $('.options-list li').on('click', (e) => {
      $(e.currentTarget).closest('.options-list').find("li").removeClass('border');
      $(e.currentTarget).addClass('border');
      //saveData(e);
    });

    // Handle previous step
    $(".prev-step").on("click", (e) => {
      this.navigateToStep(e);
      e.preventDefault();
    });

    // Handle next step - save data to data object
    $(".next-step").on('click', (e) => {
      this.saveData(e);
      this.navigateToStep(e);
      e.preventDefault();
    });

    $('.unsure').on('click', (e) => {
      this.navigateToStep(e);
      e.preventDefault();
    });
  }

  saveData = (e) => {
    var id = $(e.target).data('current');
    if (id == 4) {   // Datetime
      this.data.date = $('.datetimepicker').datetimepicker('getValue');
    } else if (id == 5) {    // Budget
      this.data.budget = $('.budget-input').val();
      this.setReviewValues();
    } else if (id == 6) {    // Review
      return;
    } else {    // All other IDs
      const choice = $(`#step-${id}`).find('li.border');
      var key = $(`#step-${id}`).closest(".matchme-form").data("key");
      var value = $(choice).find("span.option").text();
      this.data[key] = value;
    }
  }

  navigateToStep = (e) => {
    e.preventDefault();
    $(".matchme-form").hide();
    var id = $(e.target).data('target');
    var target = `#step-${id}`;
    $(target).fadeIn();
  }

  setReviewValues = () => {
    const dateFormatted = this.data.date ?
      $.format.date(this.data.date, "ddd, MMMM D, yyyy") :
      $.format.date(new Date(), "ddd, MMMM D, yyyy");
    const timeFormatted = this.data.time ?
      $.format.date(this.data.date, "HH:mm") :
      $.format.date(new Date(), "HH:mm");
    $(".review-style").text(this.data.style || 'Not set');
    $(".review-level").text(this.data.level || 'Not set');
    $(".review-type").text(this.data.type || 'Not set');
    $(".review-date").text(dateFormatted);
    $(".review-time").text(timeFormatted);
    $(".review-budget").text(`${this.data.budget} USD`);
    this.initChangeHandlers();
    this.initOmflowConnect();
  }

  initDateTimeZone = () => {
    // Call datetimepicker plugin
    $(".datetimepicker").datetimepicker({
      // yearStart: 2020,
      // step: 15,
      // dayOfWeekStart: 1,
      // showApplyButton: false,
      minDate: new Date()
    });
    // Call timezones plugin
    $('select').timezones();
  }

  initChangeHandlers = () => {
    $(".review-entry-link").on("click", (e) => {
      $(".matchme-form").hide();
      const target = "#step-" + $(e.target).data("key");
      $(target).show();
      e.preventDefault();
    });
  }

  initBudgetForm = () => {
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

  initInfoPopups = () => {
    $(".learn-more").on("mouseenter mouseleave", function () {
      $(this).closest("li").find('.popup').toggleClass("show");
    });
  }

  initOmflowConnect = () => {
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

  async getHtml() {
    return `
      <div id="matchme">

        <div class="matchme-form" id="step-1" data-key="style">
          <h1>Select Your Style</h1>
          <div class="step-wrapper">
            <ul class="options-list">
              <li>
                <span class="option">Hatha</span>
                <!-- <i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Hatha yoga is a branch of yoga. The Sanskrit word हठ hatha literally means force and thus alludes to a system of physical techniques.</span> -->
              </li>
              <li>
                <span class="option">Vinyasa</span>
                <!-- 	<i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Hatha yoga is a branch of yoga. The Sanskrit word हठ hatha literally means force and thus alludes to a system of physical techniques.</span> -->
              </li>
              <li>
                <span class="option">Yin</span>
                <!-- <i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Hatha yoga is a branch of yoga. The Sanskrit word हठ hatha literally means force and thus alludes to a system of physical techniques.</span> -->
              </li>

              <li>
                <span class="option">Ashtanga</span>
                <!-- <i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Ashtanga Yoga, which literally means eight-limbed yoga, is a system outlined in the yoga sutras attributed to the ancient sage Patanjali.</span> -->
              </li>

              <li>
                <span class="option">Nidra</span>
                <!-- <i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Hatha yoga is a branch of yoga. The Sanskrit word हठ hatha literally means force and thus alludes to a system of physical techniques.</span> -->
              </li>
              <li>
                <span class="option">Meditation</span>
                <!-- <i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Hatha yoga is a branch of yoga. The Sanskrit word हठ hatha literally means force and thus alludes to a system of physical techniques.</span> -->
              </li>
            </ul>
          </div>
          <div class="button-wrapper">
            <!-- <a class="prev-step" data-target="0" href="/omflow">Back (to the map)</a> -->
            <a class="next-step" data-current='1' data-target="2" href="">Continue</a>
          </div>
        </div>

        <div class="matchme-form" id="step-2" data-key="level">
          <h1>Select your Level</h1>
          <div class="step-wrapper">
            <ul class="options-list">
              <li>
                <span class="option">New</span>
                <!-- <i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum quam mauris. Sed lacus mi, rhoncus id mi nec, pulvinar.</span> -->
              </li>
              <li>
                <span class="option">Beginner</span>
                <!-- <i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum quam mauris. Sed lacus mi, rhoncus id mi nec, pulvinar.</span> -->
              </li>
              <li>
                <span class="option">Intermediate</span>
                <!-- 		<i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum quam mauris. Sed lacus mi, rhoncus id mi nec, pulvinar.</span> -->
              </li>
            </ul>
          </div>
          <div class="button-wrapper">
            <a class="prev-step" data-target="1" href="">Back</a>
            <a class="unsure" data-target="3" href="">Not sure</a>
            <a class="next-step" data-target="3" data-current='2 ' href="">Continue</a>
          </div>
        </div>

        <div class="matchme-form" id="step-3" data-key="type">
          <h1>Select your practice type</h1>
          <div class="step-wrapper">
            <ul class="options-list">
              <li>
                <span class="option">Group</span>
                <!-- <i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum quam mauris. Sed lacus mi, rhoncus id mi nec, pulvinar.</span>
              </li> -->
              <li>
                <span class="option">Private 1:1</span>
                <!-- <i class="fa fa-info-circle learn-more"></i>
                <span class="popup">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum quam mauris. Sed lacus mi, rhoncus id mi nec, pulvinar.</span> -->
              </li>
            </ul>
          </div>
          <div class="button-wrapper">
            <a class="prev-step" data-target="2" href="">Back</a>
            <a class="unsure" data-target="4" href="">Not sure</a>
            <a class="next-step" data-target="4" data-current='3' href="">Continue</a>
          </div>
        </div>

        <div class="matchme-form" id="step-4" data-key="date">
          <h1>Select your practice date and time</h1>
          <div class="datetimepicker_wrapper">
            <input type="text" class="datetimepicker" value="Select Date" />
            <select class="form-control"></select>
          </div>
          <div class="button-wrapper">
            <a class="prev-step" data-target="3" href="">Back</a>
            <a class="unsure" data-target="5" href="">Not sure</a>
            <a class="next-step" data-target="5" data-current='4' href="">Continue</a>
          </div>
        </div>

        <div class="matchme-form" id="step-5">
          <h1>Enter your practice budget</h1>
          <div class="step-wrapper">
            <input type="number" class="budget-input" pattern="[0-9]*2" min="1" value="0" onfocus="this.value=''" />
            <span class="budget-cents">.00</span><span class="budget-currency">USD</span>
          </div>
          <div class="button-wrapper">
            <a class="prev-step" data-target="4" href="">Back</a>
            <a class="unsure" data-target="6" href="">Not sure</a>
            <a class="next-step" data-target="6" data-current='5' href="">Continue</a>
          </div>
        </div>

        <div class="matchme-form" id="step-6">
          <h1>Review your selected journey</h1>
          <div class="review-wrapper">
            <div class="review-row">
              <div class="review-overview">
                <span class="review-date"></span><span class="review-time"></span>
                <a href="" class="review-entry-link" data-key="4" data-link>Change</a>
              </div>
            </div>
            <div class="review-row">
              <div class="review-entry">
                <span class="review-entry-header">Style</span>
                <p class="review-style"></p>
                <a href="" class="review-entry-link" data-key="1" data-link>Change</a>
              </div>
              <div class="review-entry">
                <span class="review-entry-header">Level</span>
                <p class="review-level">Not set</p>
                <a href="" class="review-entry-link" data-key="2" data-link>Change</a>
              </div>
              <div class="review-entry">
                <span class="review-entry-header">Type</span>
                <p class="review-type"></p>
                <a href="" class="review-entry-link" data-key="3" data-link>Change</a>
              </div>
              <div class="review-entry">
                <span class="review-entry-header">Budget</span>
                <p class="review-budget"></p>
                <a href="" class="review-entry-link" data-key="5">Change</a>
              </div>
            </div>
          </div>
          <div class="button-wrapper">
            <!-- <a class="prev-step" data-target="5" href="">Back</a> -->
            <a class="next-step" data-target="7" data-current='6' id="omflow-connect" href="">Omflow Connect</a>
          </div>
        </div>

        <div class="matchme-form" id="step-7">
          <h1>We found matching classes for your search criteria!</h1>
          <div class="step-wrapper">
            <ul class="matched-results"></ul>
          </div>
          <div class="button-wrapper">
            <a class="prev-step" data-target="6" href="">Back</a>
          </div>
        </div>

        <div class="loader loader-bouncing"></div>

      </div>
    `;
  }
}
