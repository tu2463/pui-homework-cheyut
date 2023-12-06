// Treasure
class Treasure {
    constructor(id, category, title, body, read, date) {
      this.id = id;
      this.category = category;
      this.title = title;
      this.content = body;
      this.read = read;
      this.date = date;

      this.element = null;
    }
  }
  
const treasures = {
    1: {category: "c_1", title: "t_1", body: "b_1"},
    2: {category: "c_2", title: "t_2", body: "b_2"}
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
  
    const date = new Date()
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
    thisTreasure.element = clone;

    // add to the html structure
    const collectionsElement = document.querySelector('.collections');
    collectionsElement.prepend(thisTreasure.elmeent);

    // update the web elem content
    const titleElement = thisTreasure.clone.querySelector('.title');
    const bodyElement = thisTreasure.clone.querySelector('.body');
    const dateElement = thisTreasure.clone.querySelector('.date');
  }
