console.log("start...");
let cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;

        this.element = null;
    }
}

let cart_allGlazing = {
    "Original": {
        name: "Keep original",
        price: 0,
    },
    "Sugar Milk": {
        name: "Sugar milk",
        price: 0,
    },
    "Vanilla Milk": {
        name: "Vanilla milk",
        price: 0.5,
    },
    "Chocolate": {
        name: "Double chocolate",
        price: 1.5
    },
};

let cart_allPack = {
    1: {
        size: 1,
        price: 1,
    },
    3: {
        size: 3,
        price: 3,
    },
    6: {
        size: 6,
        price: 5,
    },
    12: {
        size: 12,
        price: 10,
    },
};

function updateElement(thisRoll) {
    // get the HTML elements that need updating 
    // Citation: this function imitates the lab06 code
    const cartImageElement = thisRoll.element.querySelector('.cart-img');
    const cartTitleElement = thisRoll.element.querySelector('.cart-title');
    const cartGlazingElement = thisRoll.element.querySelector('.cart-glazing');
    const cartPackSizeElement = thisRoll.element.querySelector('.cart-pack-size');
    const cartPriceElement = thisRoll.element.querySelector('.cart-price');
    
    // copy our roll content over to the corresponding HTML elements
    const rollType = (thisRoll.type).toLowerCase();
    // console.log("thisR.type: ", thisRoll.type, " rollType: ", rollType);
    cartImageElement.src = '../assets/products/' + rollType + '-cinnamon-roll.jpg'
    cartTitleElement.innerText = thisRoll.type + " Cinnamon Roll";
    cartGlazingElement.innerText = "Glazing: " + thisRoll.glazing;
    cartPackSizeElement.innerText = "Pack Size: " + thisRoll.size;
    cartPriceElement.innerText = "$ " + calculateSinglePrice(thisRoll);
}


function calculateSinglePrice(thisRoll) {
    let basePrice = thisRoll.basePrice;
    // console.log("thisR: ", thisRoll,".glazing: ", thisRoll.glazing, "cart[glazing]: ");
    let glazingPrice = cart_allGlazing[thisRoll.glazing].price;
    let packPrice = cart_allPack[thisRoll.size].price;
    let singlePrice = (basePrice + glazingPrice) * packPrice;
    return singlePrice.toFixed(2);
}

function calculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        let thisRoll = cart[i];
        let singlePrice = parseFloat(calculateSinglePrice(thisRoll));
        totalPrice = totalPrice + singlePrice;
        // console.log("calTotalPrice - thisR: ", thisRoll);
        console.log("calTotalPrice: ", singlePrice, " totalP: ", totalPrice);
    }
    return totalPrice.toFixed(2);
}

function updateTotalPrice() {
    const cartTotalPriceElement = document.querySelector('.cart-total-price');
    let totalPrice = calculateTotalPrice();
    cartTotalPriceElement.innerText = "$ " + totalPrice;
}

function deleteNote(thisRoll) {
    // Citation: this function imitates the lab06 code
    // remove the notecard DOM object from the UI
    thisRoll.element.remove();
  
    // remove the actual Notecard object from our set of notecards
    let i = cart.indexOf(thisRoll);
    cart.splice(i, 1);

    updateTotalPrice();
}

function addCart (thisRoll) {
    // Adding to cart array
    cart.push(thisRoll);

    // Showing on website. Citation: this block of code imitates the lab06 code
    // make a clone of the notecard template
    const template = document.querySelector('.cart-template'); //??why can't i use ID?
    const clone = template.content.cloneNode(true); //?? what will happen if not take in true?

    // connect this clone to our roll.element
    // from this point we only need to refer to roll.element
    thisRoll.element = clone.querySelector('.cart-item');

    //create the remove button (although it's not a button in my html)
    const btnRemove = thisRoll.element.querySelector('.remove');
    btnRemove.addEventListener('click', () => {
        deleteNote(thisRoll);
    });

    // add the roll clone to the DOM
    // find the roll parent (#cart-list) and add our roll as its child
    const cartListElement = document.querySelector('#cart-list');
    cartListElement.prepend(thisRoll.element);

    // populate the roll clone with the actual roll content
    updateElement(thisRoll);

    updateTotalPrice();
}

// create some rolls
const orRoll = new Roll('Original', 'Sugar Milk', 1, 2.49);
const waRoll = new Roll('Walnut', 'Vanilla Milk', 12, 3.49);
const raRoll = new Roll('Raisin', 'Sugar Milk', 3, 2.99);
const apRoll = new Roll('Apple', 'Original', 3, 3.49);

let tempRolls = [apRoll, raRoll, waRoll, orRoll];

// add the rolls to cart
for (let i = 0; i < tempRolls.length; i++) {
    let thisRoll = tempRolls[i];
    addCart(thisRoll);
}

console.log("... end");