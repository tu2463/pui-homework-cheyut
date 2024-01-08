
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
    curRecord = getLastRecordFromHistory();
    curRecord.isCompleted = true;
    updateRecordNote(curRecord)
    localStorage.setItem('05430FP_secsLeft', -1); // this storage is used for determining whether a session has ended for the pause/resume functionality.
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
    minNum = Math.floor(secsLeft / 60);
    secNum = secsLeft % 60;
    updateTimerDisplay(minNum, secNum);
    if (secsLeft == 0) { countdownFinished();}
    else { 
        secsLeft -= 1;
        setTimeout(updateTimer, 1000);} //?? seems to run faster than /1sec. go to oh.
}

function updateFocusTimerInfo() {
    const curRecord = getLastRecordFromHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
}

function updateFocusInProgressInfo() {
    retrieveHistoryFromLocalStorage();
    updateFocusTimerInfo();

    secsLeft = localStorage.getItem('05430FP_secsLeft');
    if (secsLeft < 0){ // new session. default of secsLeft is -1.
        const timeInput = localStorage.getItem('05430FP_timeInput');
        // initTimer(timeInput.toString() + ":00");
        initTimer("00:02");
    }
    else { // resume from pause
        let minNum = Math.floor(secsLeft / 60);
        let secNum = secsLeft % 60;
        initTimer(minNum.toString() + ":" + secNum.toString());
    }
}

function updateFocusPauseinfo() {
    retrieveHistoryFromLocalStorage();
    updateFocusTimerInfo();
  
    secsLeft = localStorage.getItem('05430FP_secsLeft');
    let minNum = Math.floor(secsLeft / 60);
    let secNum = secsLeft % 60;
    updateTimerDisplay(minNum, secNum);
}

function updateEndInfo() {
    retrieveHistoryFromLocalStorage();
    const curRecord = getLastRecordFromHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
    const minElement = document.querySelector('#minutes');
    minElement.innerText = curRecord.duration + " min";

    if (localStorage.getItem('05430FP_storedCollections') != null
    && localStorage.getItem('05430FP_storedCollections') != null){
      retrieveCollectionFromLocalStorage(); 
    }
}

function updateEndTreasureInfo() {
    retrieveHistoryFromLocalStorage();
    const curRecord = getLastRecordFromHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
    const minElement = document.querySelector('#minutes');
    minElement.innerText = curRecord.duration + " min";
}