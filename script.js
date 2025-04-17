let timeLeft;
let timerId = null;
let isWorkTime = true;
let isRunning = false;
let pausedTime = null;

const timerDisplay = document.getElementById('timer');
const toggleTimerButton = document.getElementById('toggle-timer');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const modeToggleButton = document.getElementById('mode-toggle');

function updateDisplay(minutes, seconds) {
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId !== null) return;
    
    const timeInput = isWorkTime ? workTimeInput : breakTimeInput;
    if (pausedTime === null) {
        timeLeft = parseInt(timeInput.value) * 60;
    } else {
        timeLeft = pausedTime;
        pausedTime = null;
    }
    
    timerId = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        updateDisplay(minutes, seconds);
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            isWorkTime = !isWorkTime;
            isRunning = false;
            toggleTimerButton.textContent = 'Start';
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Time for a break!');
        }
    }, 1000);
}

function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        pausedTime = timeLeft;
    }
}

function resetTimer() {
    pauseTimer();
    isRunning = false;
    pausedTime = null;
    toggleTimerButton.textContent = 'Start';
    isWorkTime = true;
    timeLeft = parseInt(workTimeInput.value) * 60;
    updateDisplay(Math.floor(timeLeft / 60), timeLeft % 60);
}

function toggleTimer() {
    if (!isRunning) {
        startTimer();
        isRunning = true;
        toggleTimerButton.textContent = 'Pause';
    } else {
        pauseTimer();
        isRunning = false;
        toggleTimerButton.textContent = 'Resume';
    }
}

function toggleMode() {
    isWorkTime = !isWorkTime;
    modeToggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    modeToggleButton.className = isWorkTime ? 'work-mode' : 'break-mode';
    timeLeft = isWorkTime ? parseInt(workTimeInput.value) * 60 : parseInt(breakTimeInput.value) * 60;
    updateDisplay(Math.floor(timeLeft / 60), timeLeft % 60);
}

toggleTimerButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
modeToggleButton.addEventListener('click', toggleMode);

// Initialize the timer display
resetTimer();
modeToggleButton.className = 'work-mode'; // Set initial mode 