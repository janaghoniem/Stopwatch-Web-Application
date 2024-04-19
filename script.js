document.addEventListener('DOMContentLoaded', function() {
    const timeDisplay = document.querySelector('.time');
    const stop = document.querySelector('.stop');
    const lap = document.querySelector('.Lap');
    const start = document.querySelector('.start');
    const reset = document.querySelector('.reset');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    const stopButton = document.getElementById('stop');
    const lapButton = document.getElementById('Lap');
    const lapContainer = document.getElementById('lapContainer');
    const lapnumber =  document.getElementById('lapnumber');
    const laptime = document.getElementById('laptime');
    let active;
    let lapCount = 0;
    let lapStartTime; 
    let timerInterval;
    let milliseconds = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    function startTimer() {
        active = true;
        timerInterval = setInterval(updateTime, 10); 
    }

    function stopTimer() {
        active = false;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        lapContainer.innerHTML = ""; 
        milliseconds = 0;
        lapCount = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        updateTimeDisplay();
    }

    
    function updateTime() {
        if(active)
        {
            milliseconds += 10; 
            if (milliseconds >= 1000) {
                milliseconds -= 1000;
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                    }
                }
            }
            updateTimeDisplay();
        }
    }
    

    function updateTimeDisplay() {
        const formattedMilliseconds = '.' + milliseconds.toString().padStart(3, '0').slice(0, 2);
        const timeString = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}${formattedMilliseconds}`;
        timeDisplay.textContent = timeString;
    } 
        
    function getTime() {
        const currentTime = new Date().getTime(); 
        const elapsed = currentTime - lapStartTime; 
        const elapsedMilliseconds = Math.floor(elapsed % 1000 / 10);
        const elapsedSeconds = Math.floor(elapsed / 1000) % 60;
        const elapsedMinutes = Math.floor(elapsed / (1000 * 60)) % 60;
        const elapsedHours = Math.floor(elapsed / (1000 * 60 * 60));
        return `${elapsedHours < 10 ? '0' + elapsedHours : elapsedHours}:${elapsedMinutes < 10 ? '0' + elapsedMinutes : elapsedMinutes}:${elapsedSeconds < 10 ? '0' + elapsedSeconds : elapsedSeconds}.${elapsedMilliseconds < 10 ? '0' + elapsedMilliseconds : elapsedMilliseconds}`;
    }    
    
    function displayLapTime(lapTime) {
        lapCount++;
    
        const lapNoElement = document.createElement('h3');
        lapNoElement.textContent = "Lap " + lapCount;
    
        const lapTimeElement = document.createElement('h3');
        lapTimeElement.textContent = lapTime;
    
        lapnumber.appendChild(lapNoElement);
        laptime.appendChild(lapTimeElement);
    }

    startButton.addEventListener('click', function(){
        startTimer(); 
        stop.style.visibility = 'visible';
        lap.style.visibility = "visible";
        start.style.visibility = 'hidden';
        reset.style.visibility = 'hidden';
        lapStartTime = new Date().getTime();
    });

    resetButton.addEventListener('click', resetTimer);

    stopButton.addEventListener('click', function(){
        stopTimer();
        stop.style.visibility = 'hidden';
        lap.style.visibility = "hidden";
        start.style.visibility = 'visible';
        reset.style.visibility = 'visible';
    });

    lapButton.addEventListener('click', function() {
        if (active) {
            const lapTime = getTime(); 
            displayLapTime(lapTime); 
            lapStartTime = new Date().getTime();
        }
    });
});
