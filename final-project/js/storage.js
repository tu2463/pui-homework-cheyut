const history = [];

function addNewRecord(curTime, timeInput, noteTextValue, isCompleted, productivity) {
    const record = new Record(curTime, timeInput, noteTextValue, isCompleted, productivity);
    history.push(record);
    return record;
  }

function updateFocusInProgressInfo() {
    const curRecord = retrieveHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
  
    const timeInput = localStorage.getItem('05430FP_timeInput');
    // initTimer(timeInput.toString() + ":00");
    initTimer("00:03");
}

function updateEndInfo() {
    const curRecord = retrieveHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
    console.log(curRecord, noteBodyElement.value);
    const minElement = document.querySelector('#minutes');
    minElement.innerText = curRecord.duration + " min";
}

function retrieveHistory(){
    const historyArray = retrieveFromLocalStorage();
    const curRecordData = historyArray.slice(-1)[0];
    const curRecord = addNewRecord(curRecordData.startTime, curRecordData.duration, 
      curRecordData.note, curRecordData.isCompleted, curRecordData.productivity);
    console.log(curRecord);
    return curRecord;
}

function submitNote() { // get the attributes that will go into a new Record obj
  const timeInput = Math.floor(parseInt(document.querySelector('#textbox-time textarea.text').value));
  if (!timeInput || timeInput < 0 || timeInput > 180){
    console.log(timeInput, !timeInput, timeInput < 0, timeInput > 180);
    alert("Please enter a valid value (a number between 10-180)");
    return;
  }
  else if (0 <= timeInput && timeInput <= 10){
    alert("Please enter a value greater than 10. We would love to recommend focus longer :)");
    return;
  }

  const curDate = new Date();
  const curTime = curDate.getTime();

  const noteText = document.querySelector('#textbox textarea.text');
  const noteTextValue = noteText.value;
  const isCompleted = false;

  // create new Record obj, add the new Record to set
  const record = addNewRecord(curTime, timeInput, noteTextValue, isCompleted, -1);
  // createWebRecordElement(record); // create the record list showing in history page
  saveToLocalStorage();
  saveTimeInput(timeInput);
  window.location.replace("focus-in-progress.html");
}

function submitProductivity() {
  const productivity =  parseInt(document.querySelector('#productivity-rating textarea.text').value);
  const curRecord = history[history.length-1];
  curRecord.productivity = productivity;
  saveToLocalStorage();
  window.location.replace("end-treasure.html");
}

function submitTreasure() {
  const 
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