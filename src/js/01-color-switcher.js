const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');


let intervalId = null;


startBtn.addEventListener('click', onBtnStartClick);
stopBtn.addEventListener('click', onBtnStopClick);



function onBtnStartClick() {
    intervalId = setInterval(() => {
        startBtn.disabled = true;
         body.style.backgroundColor = getRandomHexColor();
     }, 1000);
}

function onBtnStopClick() {
    startBtn.disabled = false;
    clearInterval(intervalId);
    
}



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}