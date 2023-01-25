import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (options.defaultDate > selectedDates[0]) {
          window.alert('Please choose a date in the future');
          startBtn.disabled = true;
      } else {startBtn.disabled = false}
  },
};

const inputEl = document.getElementById('datetime-picker');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMinutes = document.querySelector('[data-minutes]');
const dateSeconds = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');

flatpickr(inputEl, options);
const currentDate = options.defaultDate;
let selectedDate = new Date(inputEl.value);


startBtn.addEventListener('click', countTimeToSelectedDate);


function countTimeToSelectedDate () {
  const selectedDate = new Date(inputEl.value);

  const timerId = setInterval(() => {
    const now = Date.now();
    const diff = selectedDate - now;
    const timeComponents = convertMs(diff);

    dateDays.textContent = timeComponents.days;
    dateHours.textContent = timeComponents.hours;
    dateMinutes.textContent = timeComponents.minutes;
    dateSeconds.textContent = timeComponents.seconds;

    if (diff <= 0) {
      stopInterval();
    }
  }, 1000);

}

function stopInterval () {
  clearInterval(timerId);
}


function addLeadingZero (value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}




