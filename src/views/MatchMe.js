import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("MatchMe");
  }

  async getHtml() {
    return `
      <div id="wrapper">

      <a href="/" class="back-home" data-link></a>

      <div class="overlay-button login-button">
        <a href="" class="show-login-layer">LOGIN</a>
      </div>
      <div id="login-overlay">
        <div class="login-form">
          <a href="" class="login-close"></a>
          <h1>Login to Omflow</h1>
          <form action="http://localhost:3000/auth" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="submit">
          </form>
        </div>
      </div>

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
          <a class="next-step" data-target="6" data-current='5' href="">Continue</a>
        </div>
      </div>

      <div class="matchme-form" id="step-6">
        <h1>Review your selected journey</h1>
        <div class="review-wrapper">
          <div class="review-row">
            <div class="review-overview">
              <span class="review-date"></span><span class="review-time"></span>
              <a href="" class="review-entry-link" data-key="4">Change</a>
            </div>
          </div>
          <div class="review-row">
            <div class="review-entry">
              <span class="review-entry-header">Style</span>
              <p class="review-style"></p>
              <a href="" class="review-entry-link" data-key="1">Change</a>
            </div>
            <div class="review-entry">
              <span class="review-entry-header">Level</span>
              <p class="review-level">Not set</p>
              <a href="" class="review-entry-link" data-key="2">Change</a>
            </div>
            <div class="review-entry">
              <span class="review-entry-header">Type</span>
              <p class="review-type"></p>
              <a href="" class="review-entry-link" data-key="3">Change</a>
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

      <!-- <div class="loader loader-default" data-text="Matching ..."></div> -->
      <!-- <div class="loader loader-border" data-text="Matching ..."></div> -->
      <div class="loader loader-bouncing"></div>

    </div>
    `;
  }
}
