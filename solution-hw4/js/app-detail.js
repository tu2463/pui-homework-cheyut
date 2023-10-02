// ---------------------------- product detail page ----------------------------

//?? how to import from another js?
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
// console.log('1 ', queryString);

const params = new URLSearchParams(queryString);
// console.log('2 ', params);

const chosenRoll = params.get('roll');
// console.log('3 ', chosenRoll);

// ----- Getting corresponding value (image, heading, basePrice) ---------------

const detailImage = document.querySelector('.detail-img');
detailImage.src = '../assets/products/' + chosenRoll + '-cinnamon-roll.jpg';
//?? why don't we need to consider the case of text in "chosenRoll"

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

    glazingPrice = parseFloat(this.value);
    console.log('7 ', this);
    rollGlazing = this.text;
    console.log('4 ', rollGlazing, this.innerText, this.value);
    priceChange(glazingPrice, packPrice);
  }


function packChange() {
    packPrice = parseInt(this.value);
    packSize = this.size;
    priceChange(glazingPrice, packPrice);
  }

let finalPrice = document.querySelector('#addcart-price');

function priceChange(glazingPrice, packPrice) {
    console.log('basePrice = ', basePrice, ' glazingPrice = ', glazingPrice, ' packPrice = ', packPrice);
    let calculatedPrice = ((basePrice + glazingPrice) * packPrice).toFixed(2);
    finalPrice.innerText = '$ ' + calculatedPrice.toString();
    console.log('calPrice = ', calculatedPrice);
}

let glazingSelect = document.querySelector('#glazing-select');
let packSelect = document.querySelector('#pack-select');

const glazingArray = Object.entries(allGlazing);
const packArray = Object.entries(allPack);

for (element in glazingArray) {
    var option = document.createElement('option');
    option.text = glazingArray[element][1].name;
    // console.log('5 ', option.text);
    // console.log('6 ', option);
    option.value = glazingArray[element][1].price;
    glazingSelect.add(option);
}

for (element in packArray) {
    var option = document.createElement('option');
    option.text = packArray[element][1].size;
    option.value = packArray[element][1].price;;
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
    console.log(rollGlazing);
    let thisRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.push(thisRoll);
    console.log(cart);
}