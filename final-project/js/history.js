const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const historyIsEmpty = params.get('status') == "empty";

const headerElement = document.querySelector('header');
const textboxElement = document.querySelector('.textbox');
const bodyElement = document.querySelector('.body');
if (historyIsEmpty){
    headerElement.style.display = "none";
    textboxElement.style.display = "none";
    bodyElement.style.display = "block";
}
else {
    headerElement.style.display = "none";
    textboxElement.style.display = "none";
    bodyElement.style.display = "block";
}

function makeRecordClone(thisRecord){
    const template = document.querySelector('.record-template');
    const clone = template.content.cloneNode(true);
    thisRecord.element = clone.querySelector('.record');
  
    // add to the html structure
    const recordsElements = document.querySelector('.records');
    recordsElements.prepend(thisRecord.element);
    const recordDateElement = thisRecord.element.querySelector('.record-date');
    const recordTimeRangeElement = thisRecord.element.querySelector('.record-timerange');
    const recordDurationElement = thisRecord.element.querySelector('.record-duration');
    recordDateElement.innerText = thisRecord.startDate;
    recordTimeRangeElement.innerText = thisRecord.startHour + ":" + thisRecord.startMin;
    recordDurationElement.innerText = thisRecord.duration + " min";
}

function updateHistoryPlanetElement(selectedRecord) {
    // update the web elem content at the right side of the collection page
    const titleElement = document.querySelector('.title');
    const bodyElement = document.querySelector('.body');
  
    // if (selectedRecord.anchorNode == null){ // haven't selected anything. display the first treasure by default.
    //   titleElement.innerText = selectedRecord.title;
    //   bodyElement.innerText = selectedRecord.body;
    //   dateElement.innerText = "Discovered on " + selectedRecord.startDate;
    // }
    // else { // the user selected a treasure
    //   titleElement.innerText = selectedRecord.anchorNode.nodeValue;
    //   const thisTreasureByTitle = treasuresByTitle[titleElement.innerText];
    //   const thisID = thisTreasureByTitle.id;

    //   for (let thisTreasure of collections){ //?? how to hash object by their ID? need a more efficient function later.
    //     if (thisTreasure.id == thisID){
    //       console.log(thisTreasure);
    //       bodyElement.innerText = thisTreasure.body;
    //     }
    //   }
    // }
}

function updateHistoryInfo() {
    if (localStorage.getItem('05430FP_storedHistory') != null){
      retrieveHistoryFromLocalStorage();
      for (let record of history){
        makeRecordClone(record);
      }
    const curRecord = getLastRecordFromHistory();
    updateHistoryPlanetElement(curRecord);
    }
    
}