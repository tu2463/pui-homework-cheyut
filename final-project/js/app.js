class Record {
    constructor(startTime, duration, note, isCompleted, productivity) {
        this.startTime = startTime;
        this.duration =  duration; // expected duration that the user set before starting a focus session; will change if the user doesn't finish the whole session.
        this.note = note;
        this.isCompleted = isCompleted;
        this.productivity = productivity;

        this.element = null;
    }
}

// function updateWebRecordElement(record) {
//   console.log(record.element);
//   const noteBodyElement = record.element.querySelector('.body');
  
//   // copy our record content over to the corresponding HTML elements
//   // LHS: html elemens; RHS: obj content
//   noteBodyElement.innerText = record.note;
// }

function createWebRecordElement(record) {
    // make a clone of the notecard template
    const rightNoteTemplate = document.querySelector('#right-note-template');
    const clone = rightNoteTemplate.content.cloneNode(true);
    // todo: left clone in history page

    // connect this clone to our notecard.element
    // from this point we only need to refer to notecard.element
    record.element = clone.querySelector('.right-note');
    // console.log(rightNoteTemplate);
    // console.log(clone);
    // console.log(clone.querySelector('.right-note'));

    // todo: add the left clone to the DOM in history page
    // add the notecard clone to the DOM
    // find the notecard parent (#notecard-list) and add our notecard as its child
    // const notecardListElement = document.querySelector('#notecard-list');
    // notecardListElement.prepend(notecard.element);
    if (localStorage.getItem('05430FP_curPage') == 'focus-in-progress'){
      const rightRoteParentElement = document.querySelector('#planet.focus');
      rightRoteParentElement.prepend(record.element); // notice the use of "prepend"
    }
    // populate the notecard clone with the actual notecard content
    // updateWebRecordElement(record);
  }

// btns
function endTreasureToHome() {
  const curRecord = retrieveHistory();
  submitNoteBody(curRecord.startTime, curRecord.duration, curRecord.isCompleted, curRecord.productivity);
  submitTreasure();
  submitSession();
  // window.location.replace("index.html");
  console.log("go to home");
}

function endTreasureToCollection() {
  const curRecord = retrieveHistory();
  submitNoteBody(curRecord.startTime, curRecord.duration, curRecord.isCompleted, curRecord.productivity);
  submitTreasure();
  submitSession();
  // window.location.replace("collection.html");
  console.log("go to collection");
}

function endToEndTreasure() {
  const curRecord = retrieveHistory();
  submitNoteBody(curRecord.startTime, curRecord.duration, curRecord.isCompleted, curRecord.productivity);
  submitProductivity();
}

let curPage = window.location.pathname.split("/").pop();
console.log(curPage);
if (curPage == 'index.html'){
  console.log("index");
  const btnInitialize = document.querySelector('#circle-button.initialize');
  btnInitialize.addEventListener('click', () => {
    submitNote();
  });
}
else if (curPage == 'focus-in-progress.html') {
  localStorage.getItem('05430FP_storedHistory'); //debug
  updateFocusInProgressInfo();
}
else if (curPage == 'end.html'){
  updateEndInfo();
  const btnProd = document.querySelector('#rec-button.to-end-treasure');
  btnProd.addEventListener('click', () => {endToEndTreasure()});
}
else if (curPage == 'end-treasure.html') {
  updateEndInfo();
  const btnSave = document.querySelector('#rec-button.to-home');
  btnSave.addEventListener('click', () => (endTreasureToHome()));
  const btnTreasure = document.querySelector('.treasure');
  btnTreasure.addEventListener('click', () => (endTreasureToCollection()));
}

// Treasure
class Treasure {
  constructor(id, category, title, body) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.content = body;
    this.read = false;
  }
}

const treasures = {
  1: {category: "c_1", title: "t_1", body: "b_1"},
  2: {category: "c_2", title: "t_2", body: "b_2"}
};

const collections = [];