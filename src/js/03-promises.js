import Notiflix from 'notiflix';

const createBtn = document.querySelector('button');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

createBtn.addEventListener('click', onBtnClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onBtnClick(e) {
  e.preventDefault();

  let delayInput = delay.valueAsNumber;

  for (let position = 1; position <= amount.valueAsNumber; position += 1) {
    createPromise(position, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayInput += step.valueAsNumber;
  }
}
