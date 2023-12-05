// Treasure
class Treasure {
    constructor(id, category, title, body, read, date) {
      this.id = id;
      this.category = category;
      this.title = title;
      this.content = body;
      this.read = read;
      this.date = date;
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
    window.location.replace("end-treasure.html?page=read");
  }

// collection.html
function updateCollectionInfo() {
    // retrieve collections from storage
    const collectionsArrayString = localStorage.getItem('05430FP_storedCollections');
    const collectionsArray = JSON.parse(collectionsArrayString);
    console.log(collectionsArray); 
  
    // re-add treasures to collections
    for (const treasure of collectionsArray) {
      const thisTreasure = new Treasure(treasure.id, treasure.category, 
        treasure.title, treasure.body, treasure.read, treasure.date);
      collections.push(thisTreasure);
      makeTreasureClone(thisTreasure);
    }
    console.log(collections);
  }
  
function makeTreasureClone(thisTreasure){
    console.log("cloning...");
  }
