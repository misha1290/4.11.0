let startTime = 0;
let elapsedTime = 0;
let timerId = null;

function updateTimerDisplay() {
    let time = Date.now() - startTime + elapsedTime;
    let milliseconds = time % 1000;
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    let formattedTime = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(seconds).padStart(2, '0') + '.' + 
        String(milliseconds).padStart(3, '0');

    document.getElementById('timer').textContent = formattedTime;
}

function startTimer() {
    if (!timerId) {
        startTime = Date.now();
        timerId = setInterval(updateTimerDisplay, 10);
    }
}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        elapsedTime += Date.now() - startTime;
        timerId = null;
    }
}

function resetTimer() {
    stopTimer();
    startTime = 0;
    elapsedTime = 0;
    document.getElementById('timer').textContent = '00:00:00.000';
}