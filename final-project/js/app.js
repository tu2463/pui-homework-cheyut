class Record {
    constructor(startTime, duration, note, isCompleted) {
        this.startTime = startTime;
        this.duration =  duration; // expected duration that the user set before starting a focus session; will change if the user doesn't finish the whole session.
        this.note = note;
        this.isCompleted = isCompleted;

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

function updateFocusInProgressInfo() {
  const historyArray = retrieveFromLocalStorage();
  const curRecordData = historyArray.slice(-1)[0];
  const curRecord = addNewRecord(curRecordData.startTime, curRecordData.duration, 
    curRecordData.note, curRecordData.isCompleted);
  console.log(curRecord);
  const noteBodyElement = document.querySelector('#left .text-group .focus-text .text');
  noteBodyElement.innerText = curRecord.note;

}

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
    updateWebRecordElement(record);
  }

function addNewRecord(curTime, durationTextValue, noteTextValue, isCompleted) {
    const record = new Record(curTime, durationTextValue, noteTextValue, isCompleted);
    history.push(record);
    return record;
  }

function submitNote() { // get the attributes that will go into a new Record obj
    const curDate = new Date();
    const curTime = curDate.getTime();

    // const durationText = document.querySelector();
    const durationTextValue = 10; // placeholder

    const noteText = document.querySelector('#textbox textarea.text');
    const noteTextValue = noteText.value;

    const isCompleted = false;

    // create new Record obj, add the new Record to set
    const record = addNewRecord(curTime, durationTextValue, noteTextValue, isCompleted);
    // createWebRecordElement(record); // create the record list showing in history page
    saveToLocalStorage();
  }


const history = [];
if (localStorage.getItem('05430FP_curPage') == 'homepage'){
  const btnInitialize = document.querySelector('#circle-button.initialize');
  btnInitialize.addEventListener('click', () => {
    submitNote();
  });
}
else if (localStorage.getItem('05430FP_curPage') == 'focus-in-progress') {
  localStorage.getItem('storedHistory'); //debug
  updateFocusInProgressInfo();
}

function saveToLocalStorage() {
  const historyArray = Array.from(history);
  console.log(historyArray);
  
  const historyArrayString = JSON.stringify(historyArray);
  localStorage.setItem('storedHistory', historyArrayString);
}

function retrieveFromLocalStorage() {
  const historyArrayString = localStorage.getItem('storedHistory');
  const historyArray = JSON.parse(historyArrayString);
  console.log(historyArray);
  
  // createWebRecordElement(curRecord);
  return historyArray
}