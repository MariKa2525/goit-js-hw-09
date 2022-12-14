const startButtonEl = document.querySelector('button[data-start]');
const stoptButtonEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

startButtonEl.addEventListener('click', () => {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
      }, 1000);
    startButtonEl.setAttribute('disabled', 'true');
});

stoptButtonEl.addEventListener("click", () => {
    clearInterval(timerId);
    startButtonEl.removeAttribute('disabled');
  });

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };