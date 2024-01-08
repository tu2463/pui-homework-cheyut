class Record {
    constructor(startDate, startHour, startMin, duration, note, isCompleted, productivity) {
        this.startDate = startDate;
        this.startHour = startHour;
        this.startMin = startMin;
        this.duration = duration; // expected duration that the user set before starting a focus session; will change if the user doesn't finish the whole session.
        this.note = note;
        this.isCompleted = isCompleted;
        this.productivity = productivity;

        this.element = null;
    }
}

function createWebRecordElement(record) {
    // make a clone of the notecard template
    const rightNoteTemplate = document.querySelector('#right-note-template');
    const clone = rightNoteTemplate.content.cloneNode(true);

    // connect this clone to our notecard.element
    // from this point we only need to refer to notecard.element
    record.element = clone.querySelector('.right-note');

    if (localStorage.getItem('05430FP_curPage') == 'focus-in-progress'){
      const rightRoteParentElement = document.querySelector('#planet.focus');
      rightRoteParentElement.prepend(record.element); // notice the use of "prepend"
    }
  }

// btns
function homeToCollection() {
  window.location.replace("collection.html");
}

function homeToHistory() {
  if (history.length == 0) {
    window.location.replace("history.html?status=empty");
  }
  else {
      window.location.replace("history.html");
  }
}

function progressToPause() {
  const curRecord = getLastRecordFromHistory();
  updateRecordNote(curRecord);
  submitTime(secsLeft);
  window.location.replace("focus-pause.html");
}

function pauseToProgress() {
  const curRecord = getLastRecordFromHistory();
  updateRecordNote(curRecord);
  submitTime(secsLeft);
  window.location.replace("focus-in-progress.html");
}

function pauseToEnd() {
  const curRecord = getLastRecordFromHistory();
  const minLeft = Math.floor(secsLeft / 60);
  curRecord.duration = curRecord.duration - minLeft;
  updateRecordNote(curRecord);
  window.location.replace("end.html");
}

function endToEndTreasure() {
  const curRecord = getLastRecordFromHistory();
  updateRecordNote(curRecord);
  submitProductivity();
}

function endToHome () {
  const curRecord = getLastRecordFromHistory();
  updateRecordNote(curRecord);
  window.location.replace("index.html");
}

function endTreasureToHome() {
  const curRecord = getLastRecordFromHistory();
  updateRecordNote(curRecord);
  // window.location.replace("index.html");
  console.log("go to home");
}

function endTreasureToCollection() {
  const curRecord = getLastRecordFromHistory();
  updateRecordNote(curRecord);
  window.location.replace("collection.html");
}

function collectionToHome() {
  window.location.replace("index.html");
}

function historyToHome() {
  window.location.replace("index.html");
}

// page load
let curPage = window.location.pathname.split("/").pop();
console.log(curPage);
if (curPage == 'index.html'){
  if (localStorage.getItem('05430FP_storedHistory') != null){
    retrieveHistoryFromLocalStorage();
  }
  const btnCollection = document.querySelector('#planet-button.collection');
  btnCollection.addEventListener('click', () => homeToCollection())
  const btnHistory = document.querySelector('#planet-button.history');
  btnHistory.addEventListener('click', () => homeToHistory())
  const btnInitialize = document.querySelector('#circle-button.initialize');
  localStorage.getItem('05430FP_storedHistory'); //debug
  btnInitialize.addEventListener('click', () => {
    submitNote();
  });
}
else if (curPage == 'focus-in-progress.html') {
  updateFocusInProgressInfo();
  const btnPause = document.querySelector('#circle-button.pause');
  btnPause.addEventListener('click', () => {progressToPause()});
}
else if (curPage == 'focus-pause.html') {
  updateFocusPauseinfo();
  const btnResume = document.querySelector('.rec-button.resume');
  btnResume.addEventListener('click', () => {pauseToProgress()});
  const btnQuit = document.querySelector('.rec-button.quit');
  btnQuit.addEventListener('click', () => {pauseToEnd()});
}
else if (curPage == 'end.html'){
  updateEndInfo();
  const btnProd = document.querySelector('.rec-button.to-end-treasure');
  const curRecord = getLastRecordFromHistory();
  if (curRecord.isCompleted){
    submitTreasure();
    btnProd.addEventListener('click', () => {endToEndTreasure()});
  }
  else { // if not completed, no treasure discovered for the user
    btnProd.addEventListener('click', () => {endToHome()});
  }
}
else if (curPage == 'end-treasure.html') {
  updateEndTreasureInfo();
  const btnSave = document.querySelector('.rec-button.to-home');
  btnSave.addEventListener('click', () => (endTreasureToHome()));
  const btnTreasure = document.querySelector('.treasure');
  btnTreasure.addEventListener('click', () => (endTreasureToCollection()));
}
else if (curPage == 'collection.html'){
  updateCollectionInfo();
  const btnBack = document.querySelector('#planet-button.back');
  btnBack.addEventListener('click', () => (collectionToHome()));
}
else if (curPage == 'history.html' || curPage == 'history.html?status=empty'){
  updateHistoryInfo();
  const btnBack = document.querySelector('#planet-button.back');
  btnBack.addEventListener('click', () => (historyToHome()));
}

// animation
function enlarge(selector) {
  // console.log("e");
  gsap.to(selector, {duration: 0.5, scale: 1.1});
}

function shrink(selector) {
  // console.log("s");
  gsap.to(selector, {duration: 0.5, scale: 1});
}