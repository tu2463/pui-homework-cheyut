console.log("started");

let finalPrice = document.querySelector('#addcart-price');

let allGlazing = [
    {
        name: "Keep original",
        price: 0,
    },
    {
        name: "Sugar milk",
        price: 0,
    },
    {
        name: "Vanilla milk",
        price: 0.5,
    },
    {
        name: "Double chocolate",
        price: 1.5
    },
];

let allPack = [
    {
        size: 1,
        price: 1,
    },
    {
        size: 3,
        price: 3,
    },
    {
        size: 6,
        price: 5,
    },
    {
        size: 12,
        price: 10,
    },
];

function glazingChange() {
    // Citation: this function and the packChange() function imitate the 'select-example' in lab 4
  
    let glazingIndex = parseInt(this.value);
  
    // Now retrieve the object at the index specified by the select's value
    glazingPrice = allGlazing[glazingIndex].price;
  
    // Update the UI
    priceChange(glazingPrice, packPrice);
  }

function packChange() {
    let packIndex = parseInt(this.value);
  
    packPrice = allPack[packIndex].price;
  
    priceChange(glazingPrice, packPrice);
  }


function priceChange(glazingPrice, packPrice) {
    console.log('glazingPrice = ', glazingPrice, ' packPrice = ', packPrice);
    basePrice = 2.49;
    let calculatedPrice = ((basePrice + glazingPrice) * packPrice).toFixed(2);
    finalPrice.innerText = '$ ' + calculatedPrice.toString();
    console.log('calPrice = ', calculatedPrice);
}

let glazingSelect = document.querySelector('#glazing-select');
let packSelect = document.querySelector('#pack-select');

// default values
let glazingPrice = 0;
let packPrice = 1;

glazingSelect.addEventListener('change', glazingChange);
packSelect.addEventListener('change', packChange);