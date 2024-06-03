let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTimer, 1000);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = null;
    difference = 0;
    running = false;
    lapCounter = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapsList.innerHTML = '';
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsList.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
