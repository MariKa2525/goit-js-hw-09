import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const clockFace = document.querySelector('.timer');
const inputEl = document.querySelector('#datetime-picker')
const valueEl = document.querySelector('.value')
const field = document.querySelector('.field')
const labelEl = document.querySelector('.label')


body.style.textAlign = "center"
body.style.backgroundColor = "teal";
body.style.fontSize = "24px";

inputEl.style.textAlign = "center"
inputEl.style.fontSize = "24px";

startButton.style.fontSize = "24px";
startButton.style.backgroundColor = "orange";

clockFace.style.display = "flex";
clockFace.style.flexDirection = "row";
clockFace.style.justifyContent = "center";
clockFace.style.whiteSpace = "pre-line";
clockFace.style.fontSize = "40px";
clockFace.style.gap= "30px";

startButton.setAttribute('disabled', 'true');
let  diffTime = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
    selectedDates = selectedDates[0];
    const startData = Date.now();
    diffTime = selectedDates - startData;
    

    if (selectedDates < startData) {
        Notiflix.Notify.failure("Please choose a date in the future");
    } else {
        startButton.removeAttribute('disabled');
        }
    },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', timer);

function timer() {
    const intervalId = setInterval(() => {
        if (diffTime <= 0) {
            stopTimer()
        } else {
            startButton.setAttribute('disabled', 'true');
            diffTime -= 1000;
            const time = convertMs(diffTime);
            upDateClockFace(time);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

const clock = clockFace.children;

function upDateClockFace({ days, hours, minutes, seconds }) {
    clock[0].firstElementChild.textContent = `${days}`; 
    clock[1].firstElementChild.textContent = `${hours}`; 
    clock[2].firstElementChild.textContent = `${minutes}`; 
    clock[3].firstElementChild.textContent = `${seconds}`; 
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
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
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}