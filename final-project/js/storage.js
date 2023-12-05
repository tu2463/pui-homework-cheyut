const history = [];

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

function updateEndTreasureInfo() {
  const id = localStorage.getItem('05430_curTreasure');
  const t  = collections[id];
  const title = t.title;
  const body = t.body;
  // const titleElement = 
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
  const timeInput = Math.floor(parseInt(document.querySelector('textarea.text.time-input').value));
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

  const isCompleted = false;
  const productivity = -1
  submitNoteBody(curTime, timeInput, isCompleted, productivity);
  saveTimeInput(timeInput);
  window.location.replace("focus-in-progress.html");
}

function submitProductivity() {
  console.log(document.querySelector('.text'), document.querySelector('.productivity-rating'), document.querySelector('.productivity-rating textarea.text.productivity').value);
  const productivity = parseInt((document.querySelector('.productivity-rating textarea.text.productivity')).value);
  const curRecord = history[history.length - 1];
  curRecord.productivity = productivity;
  saveToLocalStorage();
  window.location.replace("end-treasure.html");
}

function submitTreasure() {
  const id = Math.floor(Math.random() * (Object.keys(treasures).length - 1) + 1); // min = 0*l+1 = 1; max = 1*l+1 = l+1
  const t = treasures[id];
  console.log(Object.keys(treasures).length, id, treasures, t, collections);
  const category = t.category;
  const title = t.title;
  const body = t.body;
  const treasure = new Treasure(id, category, title, body);
  collections.push(treasure);
  localStorage.setItem('05430FP_curTreasure', id);

  const collectionsArray = Array.from(collections);
  console.log(collections);
  
  const collectionsArrayString = JSON.stringify(collectionsArray);
  localStorage.setItem('05430FP_storedCollections', collectionsArrayString);
  window.location.replace("end-treasure.html?page=read");
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