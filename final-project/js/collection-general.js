// Treasure
class Treasure {
    constructor(id, category, title, body, read, date) {
      this.id = id; // primary key
      this.category = category;
      this.title = title; // primary key
      this.body = body;
      this.read = read;
      this.date = date;

      this.element = null;
    }
  }
  
const treasures = {
    1: {category: "c_1", title: "Arthur Clarke", body: "“Two possibilities exist: either we are alone in the Universe or we are not. Both are equally terrifying.”"},
    2: {category: "c_2", title: "Ray Bradbury", body: "“We are an impossibility in an impossible universe.”"},
    3: {category: "c_8", title: "Carl Sagan", body: "“The magic is only in what books say, how they stitched the patches of the universe together into one garment for us.”"},
    4: {category: "c_4", title: "B. Sáenz", body: "“I bet you could sometimes find all the mysteries of the universe in someone's hand.”"},
    5: {category: "c_5", title: "A. Einstein", body: "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”"},
    6: {category: "c_6", title: "Rachel Carson", body: "“The more clearly we can focus our attention on the wonders and realities of the universe about us, the less taste we shall have for destruction.”"},
    7: {category: "c_7", title: "Diane Duane", body: "“The universe is a pretty big place. If it's just us, seems like an awful waste of space.”"},
};

const treasuresByTitle = {
  "Arthur Clarke": {id: 1, category: "c_1", body: "“Two possibilities exist: either we are alone in the Universe or we are not. Both are equally terrifying.”"},
  "Ray Bradbury": {id: 2, category: "c_2", body: "“We are an impossibility in an impossible universe.”"},
  "Carl Sagan": {id: 3, category: "c_8", body: "“The magic is only in what books say, how they stitched the patches of the universe together into one garment for us.”"},
  "B. Sáenz": {id: 4, category: "c_4", body: "“I bet you could sometimes find all the mysteries of the universe in someone's hand.”"},
  "A. Einstein": {id: 5, category: "c_5", body: "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”"},
  "Rachel Carson": {id: 6, category: "c_6", body: "“The more clearly we can focus our attention on the wonders and realities of the universe about us, the less taste we shall have for destruction.”"},
  "Diane Duane": {id: 7, category: "c_7", body: "“The universe is a pretty big place. If it's just us, seems like an awful waste of space.”"},
};

function submitTreasure() {
    // get a random treasure from the full treasure catalog
    // if (localStorage.getItem('05430FP_storedCollections') != null
    //   && localStorage.getItem('05430FP_storedCollections') != null){
    //   retrieveCollectionFromLocalStorage();
    // }

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
    saveCollectionToLocalStorage();
  }

// collection.html
function updateCollectionPlanetElement(selectedTreasure) {
    // update the web elem content at the right side of the collection page
    // console.log(selectedTreasure, selectedTreasure.anchorNode.nodeValue);
    const titleElement = document.querySelector('.title');
    const bodyElement = document.querySelector('.body');
    const dateElement = document.querySelector('.date');
  
    if (selectedTreasure.anchorNode == null){ // haven't selected anything. display the first treasure by default.
      titleElement.innerText = selectedTreasure.title;
      bodyElement.innerText = selectedTreasure.body;
      dateElement.innerText = "Discovered on " + selectedTreasure.date;
    }
    else { // the user selected a treasure
      titleElement.innerText = selectedTreasure.anchorNode.nodeValue;
      const thisTreasureByTitle = treasuresByTitle[titleElement.innerText];
      const thisID = thisTreasureByTitle.id;

      for (let thisTreasure of collections){ //?? how to hash object by their ID? need a more efficient function later.
        if (thisTreasure.id == thisID){
          console.log(thisTreasure);
          bodyElement.innerText = thisTreasure.body;
          dateElement.innerText = "Discovered on " + thisTreasure.date;
        }
      }
    }
}

function makeTreasureClone(thisTreasure){
  const template = document.querySelector('.treasure-template');
  const clone = template.content.cloneNode(true);
  thisTreasure.element = clone.querySelector('.treasure');

  // add to the html structure
  const collectionsElement = document.querySelector('.collections');
  collectionsElement.prepend(thisTreasure.element);
  const treasureElement = thisTreasure.element.querySelector('.treasure-title');
  treasureElement.innerText = thisTreasure.title;
}

function updateCollectionInfo() {
    // retrieve collections from storage
    if (localStorage.getItem('05430FP_storedCollections') != null
      && localStorage.getItem('05430FP_storedCollectionsIndex') != null){
      retrieveHistoryFromLocalStorage();
      retrieveCollectionFromLocalStorage();
      for (let treasure of collections){
        makeTreasureClone(treasure);
      }
      updateCollectionPlanetElement(collections[0]);
    }
}