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
    1: {category: "c_1", title: "t_111111111", body: "b_1"},
    2: {category: "c_2", title: "t_222222222", body: "b_2"}
  };
  
const collections = [];

function submitTreasure() {
    // get a random treasure from the full treasure catalog
    const id = Math.floor(Math.random() * (Object.keys(treasures).length - 1) + 1); // min = 0*l+1 = 1; max = 1*l+1 = l+1
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
    localStorage.setItem('05430FP_curTreasure', id);
  
    const collectionsArray = Array.from(collections);
    console.log(collections);
    
    const collectionsArrayString = JSON.stringify(collectionsArray);
    localStorage.setItem('05430FP_storedCollections', collectionsArrayString);
  }

// collection.html
function updateCollectionInfo() {
    // retrieve collections from storage
    const collectionsArrayString = localStorage.getItem('05430FP_storedCollections');
    const collectionsArray = JSON.parse(collectionsArrayString);
    console.log(collectionsArray); 
  
    // re-add treasures to collections
    for (let i = 0; i < collectionsArray.length; i++){
      const treasure = collectionsArray[0];
      const thisTreasure = new Treasure(treasure.id, treasure.category, 
        treasure.title, treasure.body, treasure.read, treasure.date);
      collections.push(thisTreasure);
      makeTreasureClone(thisTreasure);
    }
    console.log(collections);
  }

function makeTreasureClone(thisTreasure){
    const template = document.querySelector('.treasure-template');
    const clone = template.content.cloneNode(true);
    thisTreasure.element = clone.querySelector('.treasure');


    // add to the html structure
    const collectionsElement = document.querySelector('.collections');
    collectionsElement.prepend(thisTreasure.element);

    // update the web elem content
    const treasureElement = thisTreasure.element.querySelector('.treasure-title');
    const titleElement = document.querySelector('.title');
    const bodyElement = document.querySelector('.body');
    const dateElement = document.querySelector('.date');

    titleElement.innerText = thisTreasure.title;
    bodyElement.innerText = thisTreasure.body;
    dateElement.innerText = "Discovered on " + thisTreasure.date;
    treasureElement.innerText = thisTreasure.title;
  }
