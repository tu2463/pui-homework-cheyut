
let secsLeft;

function initTimer(timeString) {
    let time = {
        min: timeString.split(':')[0],
        sec: timeString.split(':')[1]
    };

    let minNum = parseInt(time.min);
    let secNum =  parseInt(time.sec);
    secsLeft = minNum * 60 + secNum;

    updateTimer(minNum, secNum);
}

function countdownFinished() {
    curRecord = history[history.length - 1];
    curRecord.isCompleted = true;
    submitNoteBody(curRecord.startTime, curRecord.duration, curRecord.isCompleted, curRecord.productivity);
    saveToLocalStorage();
    window.location.replace("end.html");
}

function updateTimerDisplay(minNum, secNum) {
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

function updateTimer(minNum, secNum) {
    secsLeft -= 1;
    minNum = Math.floor(secsLeft / 60);
    secNum = secsLeft % 60;
    updateTimerDisplay(minNum, secNum);
    if (secsLeft == 0) { countdownFinished();}
    else { setTimeout(updateTimer, 1000);} //?? bug: seems to run faster than /1sec. go to oh.
}

function updateFocusInProgressInfo() {
    const curRecord = retrieveHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
  
    const timeInput = localStorage.getItem('05430FP_timeInput');
    initTimer(timeInput.toString() + ":00");
    // initTimer("00:03");
}

function updateFocusPauseinfo() {
    const curRecord = retrieveHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
  
    secsLeft = localStorage.getItem('05430FP_secsLeft');
    let minNum = Math.floor(secsLeft / 60);
    let secNum = secsLeft % 60;
    updateTimerDisplay(minNum, secNum);
}