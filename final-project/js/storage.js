const history = [];

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

function addNewRecord(curTime, timeInput, noteTextValue, isCompleted, productivity) {
  const record = new Record(curTime, timeInput, noteTextValue, isCompleted, productivity);
  history.push(record);
  return record;
}

function submitNoteBody(startTime, duration, isCompleted, productivity) { //incomplete yet!!!
  const noteText = document.querySelector('textarea.text.note-body');
  const noteTextValue = noteText.value;

  // create new Record obj, add the new Record to set
  const record = addNewRecord(startTime, duration, noteTextValue, isCompleted, productivity);
  // createWebRecordElement(record); // create the record list showing in history page
  saveToLocalStorage();
}

function submitNote() { // get the attributes that will go into a new Record obj
  let timeInput = Math.floor(parseInt(document.querySelector('textarea.text.time-input').value));
  if (!timeInput) {
    timeInput = 25; // default
  }
  else if (timeInput < 0 || timeInput > 180){
    console.log(timeInput, !timeInput, timeInput < 0, timeInput > 180);
    alert("Please enter a valid value (a number between 10-180)");
    return;
  }
  else if (0 <= timeInput && timeInput < 10){
    alert("Please focus for at least 10 minutes :)");
    return;
  }

  const curDate = new Date().toDateString();

  const isCompleted = false;
  const productivity = -1
  submitNoteBody(curDate, timeInput, isCompleted, productivity);
  saveTimeInput(timeInput);
  window.location.replace("focus-in-progress.html");
}

function submitTime(secsLeft){
  localStorage.setItem('05430FP_secsLeft', secsLeft);
}

function submitProductivity() {
  const productivity = parseInt((document.querySelector('.productivity-rating textarea.text.productivity')).value);
  if (productivity < 0 || productivity > 5) {
    alert("Please enter a valid value (a number between 1-5)");
  }
  const curRecord = history[history.length - 1];
  curRecord.productivity = productivity;
  saveToLocalStorage();
  window.location.replace("end-treasure.html");
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