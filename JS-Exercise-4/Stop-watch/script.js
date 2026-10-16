
const currentTime = document.getElementById("currentTime");
const currentDate = document.getElementById("currentDate");
const stopwatch = document.getElementById("stopwatch");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");


function updateClock() {
    const now = new Date();

    currentTime.textContent = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const day = String(now.getDate()).padStart(2, "0");

    const month = now.toLocaleString("en-GB", {
        month: "short"
    });

    const year = now.getFullYear();

    currentDate.textContent = `${day}-${month}-${year}`;
}

updateClock();
setInterval(updateClock, 1000);


// // ---------- STOPWATCH ----------

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

function displayStopwatch() {
    const totalMilliseconds = elapsedTime;

    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const centiseconds = Math.floor(
        (totalMilliseconds % 1000) / 10
    );

    stopwatch.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(centiseconds).padStart(2, "0");
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    displayStopwatch();
}

// Start button
startBtn.addEventListener("click", function () {
    startTime = Date.now() - elapsedTime;
    isRunning = true;

    timerInterval = setInterval(updateStopwatch, 10);

    startBtn.disabled = true;
    stopBtn.disabled = false;
    resumeBtn.disabled = true;
    resetBtn.disabled = false;
});

// Stop button
stopBtn.addEventListener("click", function () {
    if (!isRunning) return;

    updateStopwatch();
    clearInterval(timerInterval);
    isRunning = false;

    stopBtn.disabled = true;
    resumeBtn.disabled = false;
    resetBtn.disabled = false;
});

// Resume button
resumeBtn.addEventListener("click", function () {
    if (isRunning) return;

    startTime = Date.now() - elapsedTime;
    isRunning = true;

    timerInterval = setInterval(updateStopwatch, 10);

    startBtn.disabled = true;
    stopBtn.disabled = false;
    resumeBtn.disabled = true;
    resetBtn.disabled = false;
});

// Reset button
resetBtn.addEventListener("click", function () {
    clearInterval(timerInterval);

    elapsedTime = 0;
    startTime = 0;
    isRunning = false;

    displayStopwatch();

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resumeBtn.disabled = true;
    resetBtn.disabled = true;
});

// Show zero initially
displayStopwatch();
