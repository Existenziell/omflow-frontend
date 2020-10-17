import AbstractView from "./AbstractView.js";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';

import '../../scss/schedule.scss';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Schedule");
  }

  // https://fullcalendar.io/docs
  initCalendar = async () => {
    const practices = await (await fetch(`${process.env.API_URL}/practices/`)).json();
    const events = [];
    for (let p of practices) {
      const event = {
        id: p._id,
        title: `${p.level.identifier} ${p.style.identifier} (${p.teacher.name})`,
        start: p.date,
        end: p.date + (p.duration * 60 * 1000),
        url: `/classes/${p._id}`,
        className: 'schedule-event'
      }
      events.push(event);
    }
    const calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, momentPlugin, momentTimezonePlugin],
      events: events,
      headerToolbar: {
        center: 'dayGridMonth,timeGridWeek,timeGridDay' // buttons for switching between views
      },
      views: {
        dayGridMonth: {
          buttonText: 'Month'
        },
        timeGridWeek: {
          buttonText: 'Week'
        },
        timeGridDay: {
          buttonText: 'Day'
        }
      },
      eventClick: (info) => {
        info.jsEvent.preventDefault(); // don't let the browser navigate
        if (info.event.url) {
          location.href = info.event.url;
        }
      }
    });
    calendar.render();
  }

  getHtml = async () => {
    return `
      <div id="calendar"></div>
    `;
  }
}
