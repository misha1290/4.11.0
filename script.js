let currentTimer = 1; // Текущий таймер (1 - секундомер, 2 - 1 час, 3 - 30 сек)
let startTime = 0;
let elapsedTime = 0;
let timerId = null;

// Вывод алерта при загрузке страницы
window.onload = function () {
    alert("Перемикання між таймерами: \n1 - Секундомір\n2 - Таймер на 1 годину\n3 - Таймер на 30 секунд");
};

// Обработчик переключения таймеров
document.addEventListener("keydown", (event) => {
    if (event.key === "1" || event.key === "2" || event.key === "3") {
        currentTimer = Number(event.key);
        updateTimerDisplay();
        stopTimer();
        resetTimer();
    }
});

// Функция обновления отображения таймера
function updateTimerDisplay() {
    let time = Date.now() - startTime + elapsedTime;

    if (currentTimer === 2) {
        // Таймер 1 час
        let remainingTime = 60 * 60 * 1000 - time;
        if (remainingTime <= 0) {
            stopTimer();
            return;
        }

        let minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        let seconds = Math.floor((remainingTime / 1000) % 60);
        let formattedTime = `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById("timer").textContent = formattedTime;

        // Оповещение при 30 минутах
        if (minutes === 30 && seconds === 0) {
            alert("Залишилось менше половини часу!");
        }
    } else if (currentTimer === 3) {
        // Таймер 30 секунд, уменьшается каждую миллисекунду
        let remainingTime = 30 * 1000 - time;
        if (remainingTime <= 0) {
            stopTimer();
            document.getElementById("timer").textContent = "00:00.000";
            document.querySelector("button").disabled = false; // Делаем кнопку активной
            return;
        }

        let seconds = Math.floor((remainingTime / 1000) % 60);
        let milliseconds = remainingTime % 1000;
        let formattedTime = `00:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
        document.getElementById("timer").textContent = formattedTime;

        // Анимация при 10 секундах
        if (seconds <= 10) {
            document.getElementById("timer").style.color = "#db431a";
        } else {
            document.getElementById("timer").style.color = "black";
        }
    } else {
        // Обычный секундомер (исправлено)
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
}

// Запуск таймера (исправлено)
function startTimer() {
    if (!timerId) {
        startTime = Date.now();
        timerId = setInterval(updateTimerDisplay, currentTimer === 3 ? 1 : 10);
    }
}

// Остановка таймера (исправлено)
function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        elapsedTime += Date.now() - startTime;
        timerId = null;
    }
}

// Сброс таймера
function resetTimer() {
    stopTimer();
    elapsedTime = 0;

    if (currentTimer === 2) {
        document.getElementById("timer").textContent = "00:60:00";
    } else if (currentTimer === 3) {
        document.getElementById("timer").textContent = "00:30.000";
        document.getElementById("timer").style.color = "black";
    } else {
        document.getElementById("timer").textContent = "00:00:00.000";
    }
}
