import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputField = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

startBtn.disabled = true;
let yourDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];
    if (chosenDate > new Date()) {
      yourDate = chosenDate;
      startBtn.disabled = false;
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};

const fp = flatpickr(inputField, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => value.toString().padStart(2, '0');

let countInterval = 0;

const countingDown = () => {
  clearInterval(countInterval);

  countInterval = setInterval(() => {
    const actualTime = new Date();
    const difference = yourDate - actualTime;
    if (difference < 0) {
      clearInterval(countInterval);
      return;
    }
    const timeObject = convertMs(difference);

    daysValue.textContent = addLeadingZero(timeObject.days);
    hoursValue.textContent = addLeadingZero(timeObject.hours);
    minutesValue.textContent = addLeadingZero(timeObject.minutes);
    secondsValue.textContent = addLeadingZero(timeObject.seconds);
  }, 1000);
};

startBtn.addEventListener('click', countingDown);
