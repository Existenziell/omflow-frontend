import AbstractView from "./AbstractView.js";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../scss/schedule.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Schedule");
  }

  // https://fullcalendar.io/docs
  initCalendar = () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin]
    });
    calendar.render();
  }

  async getHtml() {
    return `
      <h1>Schedule</h1>
      <div id="calendar"></div>
    `;
  }
}
