const history = [];
const collections = [];
const collectionsIndex = new Set();

function getLastRecordFromHistory() {
  return history[history.length - 1];
}

function updateRecordNote(record) {
  const noteText = document.querySelector('textarea.text.note-body');
  const noteTextValue = noteText.value;
  record.note = noteTextValue;
  saveHistoryToLocalStorage();
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
  const curHour = new Date().getHours();
  const curMin = new Date().getMinutes();

  const isCompleted = false;
  const productivity = -1

  const noteText = document.querySelector('textarea.text.note-body');
  const noteTextValue = noteText.value;
  const record = new Record(curDate, curHour, curMin, timeInput, noteTextValue, isCompleted, productivity);
  history.push(record);
  saveHistoryToLocalStorage();

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
  saveHistoryToLocalStorage();
  window.location.replace("end-treasure.html");
}

function saveHistoryToLocalStorage() {
  const historyArray = Array.from(history);
  console.log("saved history: ", historyArray);
  
  const historyArrayString = JSON.stringify(historyArray);
  localStorage.setItem('05430FP_storedHistory', historyArrayString);
}

function retrieveHistoryFromLocalStorage() {
  const historyArrayString = localStorage.getItem('05430FP_storedHistory');
  const historyArray = JSON.parse(historyArrayString);
  console.log("retrieved history: ", historyArray);
  for (const record of historyArray) {
    const thisRecord = new Record(record.startDate, record.startHour, record.startMin, record.duration, record.note, record.isCompleted, record.productivity);
    history.push(thisRecord)
  }
}

function saveCollectionToLocalStorage() {
  const collectionsArray = Array.from(collections);
  const collectionsIndexArray = Array.from(collectionsIndex);
  console.log(collections, collectionsIndex);
  
  const collectionsArrayString = JSON.stringify(collectionsArray);
  const collectionsIndexArrayString = JSON.stringify(collectionsIndexArray);
  localStorage.setItem('05430FP_storedCollections', collectionsArrayString);
  localStorage.setItem('05430FP_storedCollectionsIndex', collectionsIndexArrayString);
}

function retrieveCollectionFromLocalStorage() {
  const collectionsArrayString = localStorage.getItem('05430FP_storedCollections');
  const collectionsIndexArrayString = localStorage.getItem('05430FP_storedCollectionsIndex');
  const collectionsArray = JSON.parse(collectionsArrayString);
  const collectionsIndexArray = JSON.parse(collectionsIndexArrayString);
    
  // re-add indices
  for (let i = 0; i < collectionsIndexArray.length; i++){
    const treasureIndex = collectionsIndexArray[i];
    collectionsIndex.add(treasureIndex);
  }

  // re-add treasures to collections
  for (let i = 0; i < collectionsArray.length; i++){
    const treasure = collectionsArray[i];
    const thisTreasure = new Treasure(treasure.id, treasure.category, 
      treasure.title, treasure.body, treasure.read, treasure.date);
    collections.push(thisTreasure);
  }
  console.log("collections & cur index", collections, collectionsIndex);
  
}