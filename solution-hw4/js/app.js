// ---------------------------- product gallery & detail page ----------------------------

const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

// ----- Getting the parameter -------------------------------------------------

const queryString = window.location.search;

const params = new URLSearchParams(queryString);

const chosenRoll = params.get('roll');

// ----- Getting corresponding value (image, heading, basePrice) ---------------

const detailImage = document.querySelector('.detail-img');
detailImage.src = '../assets/products/' + chosenRoll.toLowerCase() + '-cinnamon-roll.jpg';

const headerElement = document.querySelector('#detail-intro');
headerElement.innerText = chosenRoll + ' cinnamon roll';;

const basePrice = rolls[chosenRoll]['basePrice'];

// ----- Calculating price ----------------------------------------------------------------

let allGlazing = {
    0: {
        name: "Keep original",
        price: 0,
    },
    1: {
        name: "Sugar milk",
        price: 0,
    },
    2: {
        name: "Vanilla milk",
        price: 0.5,
    },
    3: {
        name: "Double chocolate",
        price: 1.5
    },
};

let allPack = {
    0: {
        size: 1,
        price: 1,
    },
    1: {
        size: 3,
        price: 3,
    },
    2: {
        size: 6,
        price: 5,
    },
    3: {
        size: 12,
        price: 10,
    },
};

// default values
let glazingPrice = 0;
let packPrice = 1;

// these variables are used for the addCart() 
let rollGlazing = 'Keep original'; //name of the glaizng
let packSize = 1; 

function glazingChange() {
    // Citation: this function and the packChange() function imitate the 'select-example' in lab 4
    let glazingIndex = parseInt(this.value);

    // Now retrieve the object at the index specified by the select's value
    glazingPrice = allGlazing[glazingIndex].price;
    
    rollGlazing = allGlazing[glazingIndex].name;
    priceChange(glazingPrice, packPrice);
  }


function packChange() {
    let packIndex = parseInt(this.value);
    packPrice = allPack[packIndex].price;
    packSize = allPack[packIndex].size;
    priceChange(glazingPrice, packPrice);
  }

let finalPrice = document.querySelector('#addcart-price');

function priceChange(glazingPrice, packPrice) {
    let calculatedPrice = ((basePrice + glazingPrice) * packPrice).toFixed(2);
    finalPrice.innerText = '$ ' + calculatedPrice.toString();
}

let glazingSelect = document.querySelector('#glazing-select');
let packSelect = document.querySelector('#pack-select');

// Citation: I learned about Object,keys().length from here:
// https://stackoverflow.com/questions/5223/length-of-a-javascript-object

for (let i = 0; i < Object.keys(allGlazing).length; i++) {
    var option = document.createElement('option');
    option.text = allGlazing[i].name;
    option.value = i;
    glazingSelect.add(option);
}

for (let i = 0; i < Object.keys(allPack).length; i++) {
    var option = document.createElement('option');
    option.text = allPack[i].size;
    option.value = i;
    packSelect.add(option);
}

priceChange(glazingPrice, packPrice);

glazingSelect.addEventListener('change', glazingChange);
packSelect.addEventListener('change', packChange);

// ----- Adding to cart ----------------------------------------------------------------

let cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

function addCart () {
    let rollType = chosenRoll;
    let thisRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.push(thisRoll);
    console.log(cart);
}