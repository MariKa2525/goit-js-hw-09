import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onValueForPromise);

function createPromise(position, delay) {
  return new Promise ((rezolve,reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        rezolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay)
  })
}

  function onValueForPromise(evt) {
    evt.preventDefault();
    const value = evt.target.elements;
    const firstDelay = +value.delay.value;
    let delayStep = +value.step.value;
    const amountVal = +value.amount.value;

    for (let i = 0; i< amountVal; i += 1) {
      const delayValue = firstDelay + delayStep * i;

    createPromise(i + 1, + delayValue)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    }    
  }