const history = [];

function addNewRecord(curTime, timeInput, noteTextValue, isCompleted) {
    const record = new Record(curTime, timeInput, noteTextValue, isCompleted);
    history.push(record);
    return record;
  }

function updateFocusInProgressInfo() {
    const curRecord = retrieveHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
  
    const timeInput = localStorage.getItem('05430FP_timeInput');
    // initTimer(timeInput.toString() + ":00");
    initTimer("00:05");
}

function updateEndInfo() {
    const curRecord = retrieveHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
    const minElement = document.querySelector('#minutes');
    minElement.innerText = curRecord.duration + " min";
}

function retrieveHistory(){
    const historyArray = retrieveFromLocalStorage();
    const curRecordData = historyArray.slice(-1)[0];
    const curRecord = addNewRecord(curRecordData.startTime, curRecordData.duration, 
      curRecordData.note, curRecordData.isCompleted);
    console.log(curRecord);
    return curRecord;
}

function saveToLocalStorage() {
    const historyArray = Array.from(history);
    console.log(historyArray);
    
    const historyArrayString = JSON.stringify(historyArray);
    localStorage.setItem('05430FP_storedHistory', historyArrayString);
  }
  
  function saveTimeInput(timeInput){
    localStorage.setItem('05430FP_timeInput', timeInput.toString());
  }
  
  function retrieveFromLocalStorage() {
    const historyArrayString = localStorage.getItem('05430FP_storedHistory');
    const historyArray = JSON.parse(historyArrayString);
    console.log(historyArray);
    
    // createWebRecordElement(curRecord);
    return historyArray
  }