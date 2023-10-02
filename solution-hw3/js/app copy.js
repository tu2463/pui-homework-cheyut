console.log("started");

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

function glazingChange() {
    glazingPrice = parseFloat(this.value);
    priceChange(glazingPrice, packPrice);
  }

function packChange() {
    packPrice = parseInt(this.value);
    priceChange(glazingPrice, packPrice);
  }

let finalPrice = document.querySelector('#addcart-price');

function priceChange(glazingPrice, packPrice) {
    console.log('glazingPrice = ', glazingPrice, ' packPrice = ', packPrice);
    basePrice = 2.49;
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
    option.value = glazingArray[element][1].price;
    glazingSelect.add(option);
}

for (element in packArray) {
    var option = document.createElement('option');
    option.text = packArray[element][1].size;
    option.value = packArray[element][1].price;;
    packSelect.add(option);
}

// default values
let glazingPrice = 0;
let packPrice = 1;
priceChange(glazingPrice, packPrice);

glazingSelect.addEventListener('change', glazingChange);
packSelect.addEventListener('change', packChange);
