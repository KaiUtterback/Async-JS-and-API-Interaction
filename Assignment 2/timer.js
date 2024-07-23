let countdown;
let repeatNotification;
const timerDisplay = document.getElementById('timer');
const notificationDisplay = document.getElementById('notification');
const loadingDisplay = document.getElementById('loading');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            showNotification();
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

function showNotification() {
    notificationDisplay.textContent = "Time's up!";
    delayedNotification("This is a delayed notification", 5000);
    repeatNotification = setInterval(() => {
        notificationDisplay.textContent = "Repeat notification!";
    }, 10000);
}

function delayedNotification(message, delay) {
    setTimeout(() => {
        alert(message);
    }, delay);
}

function stopRepeatNotification() {
    clearInterval(repeatNotification);
    notificationDisplay.textContent = "";
}

startButton.addEventListener('click', () => {
    const duration = 120; // 2 minutes countdown
    timer(duration);
});

stopButton.addEventListener('click', () => {
    clearInterval(countdown);
    stopRepeatNotification();
    displayTimeLeft(0);
});
