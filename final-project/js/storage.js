const history = [];

function updateEndInfo() {
    retrieveFromLocalStorage();
    const curRecord = getLastRecordFromHistory();
    const noteBodyElement = document.querySelector('#left .text-group textarea');
    noteBodyElement.value = curRecord.note;
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

function getLastRecordFromHistory() {
  return history[history.length - 1];
}

function updateRecordNote(record) {
  const noteText = document.querySelector('textarea.text.note-body');
  const noteTextValue = noteText.value;
  record.note = noteTextValue;
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

  localStorage.setItem('05430FP_secsLeft', -1); // this storage is used for determining whether a session has ended for the pause/resume functionality.
  const curDate = new Date().toDateString();

  const isCompleted = false;
  const productivity = -1
  // submitNoteBody(curDate, timeInput, isCompleted, productivity);

  const noteText = document.querySelector('textarea.text.note-body');
  const noteTextValue = noteText.value;
  const record = new Record(curDate, timeInput, noteTextValue, isCompleted, productivity);
  history.push(record);
  saveToLocalStorage();

  localStorage.setItem('05430FP_timeInput', timeInput.toString());
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
  
function retrieveFromLocalStorage() {
    const historyArrayString = localStorage.getItem('05430FP_storedHistory');
    const historyArray = JSON.parse(historyArrayString);
    console.log(historyArray);
    for (const record of historyArray) {
      const thisRecord = new Record(record.startTime, record.duration, record.note, record.isCompleted, record.productivity);
      history.push(thisRecord)
    }
  }