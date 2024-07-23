let timerInterval;

function startTimer() {
    const duration = prompt('Enter duration in seconds:');
    let timeLeft = parseInt(duration, 10);

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
        } else {
            timeLeft -= 1;
            updateTimerDisplay(timeLeft);
        }
    }, 1000);
}

function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
