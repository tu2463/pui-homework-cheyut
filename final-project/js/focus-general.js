
function initTimer(timeString) {
    let time = {
        min: timeString.split(':')[0],
        sec: timeString.split(':')[1]
    };

    let minNum = parseInt(time.min);
    let secNum =  parseInt(time.sec);
    let secsLeft = minNum * 60 + secNum;

    function updateTimerDisplay() {
        const minElement = document.querySelector('#minutes');
        const secElement = document.querySelector('#seconds');

        let minString;
        let secString;

        if (minNum < 10) { minString = "0" + minNum;}
        else { minString = minNum;}
        if (secNum < 10) { secString = "0" + secNum;}
        else { secString = secNum;}

        minElement.innerText = minString;
        secElement.innerText = secString;
    }

    function countdownFinished() {
        curRecord = history[history.length - 1];
        curRecord.isCompleted = true;
        submitNoteBody(curRecord.startTime, curRecord.duration, curRecord.isCompleted, curRecord.productivity);
        saveToLocalStorage();
        window.location.replace("end.html");
    }

    function updateTimer() {
        secsLeft -= 1;
        minNum = Math.floor(secsLeft / 60);
        secNum = secsLeft % 60;
        updateTimerDisplay();
        if (secsLeft == 0) { countdownFinished();}
        else { setTimeout(updateTimer, 1000);} // bug: seems to run faster than /1sec. go to oh.
    }

    updateTimer();
}