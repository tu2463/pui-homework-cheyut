// Treasure
class Treasure {
    constructor(id, category, title, body, read, date) {
      this.id = id;
      this.category = category;
      this.title = title;
      this.body = body;
      this.read = read;
      this.date = date;

      this.element = null;
    }
  }
  
const treasures = {
    1: {category: "c_1", title: "11111111", body: "b_1"},
    2: {category: "c_2", title: "22222222", body: "b_2"},
    3: {category: "c_3", title: "33333333", body: "b_3"},
    4: {category: "c_4", title: "44444444", body: "b_4"},
    5: {category: "c_5", title: "55555555", body: "b_5"},
    6: {category: "c_6", title: "66666666", body: "b_6"},
    7: {category: "c_7", title: "77777777", body: "b_7"},
    8: {category: "c_8", title: "88888888", body: "b_8"},
    9: {category: "c_9", title: "99999999", body: "b_9"},
  };
  
const collections = [];
const collectionsIndex = new Set();

function submitTreasure() {
    // get a random treasure from the full treasure catalog
    const id = Math.floor(Math.random() * (Object.keys(treasures).length - 1) + 1); // min = 0*(l-1)+1 = 1; max = 1*(l-1)+1 = l
    
    if (collectionsIndex.has(id)){
      console.log("repeated treasure")
      return; // don't re-add treasures that you already had
    }

    const t = treasures[id];
    // console.log(Object.keys(treasures).length, id, treasures, t, collections);
    const category = t.category;
    const title = t.title;
    const body = t.body;
  
    const date = new Date().toDateString(); // cur date, not the date of the session, 
                                            // cuz you might start the session in day1 and end it in day2. 
                                            // the treasure is discovered on day2.
    
    const treasure = new Treasure(id, category, title, body, false, date);
    collections.push(treasure);
    collectionsIndex.add(id);
    localStorage.setItem('05430FP_curTreasure', id);
  
    const collectionsArray = Array.from(collections);
    const collectionsIndexArray = Array.from(collectionsIndex);
    console.log(collections, collectionsIndex);
    
    const collectionsArrayString = JSON.stringify(collectionsArray);
    const collectionsIndexArrayString = JSON.stringify(collectionsIndexArray);
    localStorage.setItem('05430FP_storedCollections', collectionsArrayString);
    localStorage.setItem('05430FP_storedCollectionsIndex', collectionsIndexArrayString);
  }

// collection.html
function updateCollectionPlanetElement(selectedTreasure) {
    // update the web elem content
    const treasureElement = selectedTreasure.element.querySelector('.treasure-title');
    const titleElement = document.querySelector('.title');
    const bodyElement = document.querySelector('.body');
    const dateElement = document.querySelector('.date');
  
    titleElement.innerText = selectedTreasure.title;
    bodyElement.innerText = selectedTreasure.body;
    dateElement.innerText = "Discovered on " + selectedTreasure.date;
    treasureElement.innerText = selectedTreasure.title;
}

function makeTreasureClone(thisTreasure){
  const template = document.querySelector('.treasure-template');
  const clone = template.content.cloneNode(true);
  thisTreasure.element = clone.querySelector('.treasure');


  // add to the html structure
  const collectionsElement = document.querySelector('.collections');
  collectionsElement.prepend(thisTreasure.element);
}

function updateCollectionInfo() {
    // retrieve collections from storage
    const collectionsArrayString = localStorage.getItem('05430FP_storedCollections');
    const collectionsIndexArrayString = localStorage.getItem('05430FP_storedCollectionsIndex');
    const collectionsArray = JSON.parse(collectionsArrayString);
    const collectionsIndexArray = JSON.parse(collectionsIndexArrayString);
    console.log(collectionsArray, collectionsIndexArray); 
  
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
      makeTreasureClone(thisTreasure);
    }
    console.log(collections, collectionsIndex);
    updateCollectionPlanetElement(collections[0]);
  }