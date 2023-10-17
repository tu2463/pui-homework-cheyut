class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;

        this.element = null;
    }
}

// Since the allglazing & allPack are established differently in detail 
// page and cart page for convenience, I will create two new dictionary that 
// connects the dictionaries used in the two pages.

let convert_allGlazing = {
    // glazing name match to rollGlazing
    "Keep original": "Original",
    "Sugar milk": "Sugar Milk",
    "Vanilla milk": "Vanilla Milk",
    "Double chocolate": "Chocolate",
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

function updateElement(thisRoll) { // get the HTML elements that need updating 
    // Citation: this function imitates the lab06 code
    const cartImageElement = thisRoll.element.querySelector('.cart-img');
    const cartTitleElement = thisRoll.element.querySelector('.cart-title');
    const cartGlazingElement = thisRoll.element.querySelector('.cart-glazing');
    const cartPackSizeElement = thisRoll.element.querySelector('.cart-pack-size');
    const cartPriceElement = thisRoll.element.querySelector('.cart-price');
    
    // copy our roll content over to the corresponding HTML elements
    const rollType = (thisRoll.type).toLowerCase();
    cartImageElement.src = '../assets/products/' + rollType + '-cinnamon-roll.jpg'
    cartTitleElement.innerText = thisRoll.type + " Cinnamon Roll";
    cartGlazingElement.innerText = "Glazing: " + thisRoll.glazing;
    cartPackSizeElement.innerText = "Pack Size: " + thisRoll.size;
    cartPriceElement.innerText = "$ " + calculateSinglePrice(thisRoll);
}


function calculateSinglePrice(thisRoll) {
    let basePrice = thisRoll.basePrice;
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
    }
    return totalPrice.toFixed(2);
}

function updateTotalPrice() {
    const cartTotalPriceElement = document.querySelector('.cart-total-price');
    let totalPrice = calculateTotalPrice();
    // console.log("TP: ", totalPrice);
    cartTotalPriceElement.innerText = "$ " + totalPrice;
}

function deleteRoll(thisRoll) {
    // Citation: this function imitates the lab06 code
    // remove the roll DOM object from the UI
    thisRoll.element.remove();
  
    // remove the actual Roll object from the cart array
    let i = cart.indexOf(thisRoll);
    cart.splice(i, 1);

    updateTotalPrice();
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const cartArrayString = JSON.stringify(cart);
    // console.log("saving ", cart, "as", cartArrayString);
    localStorage.setItem('storedCart', cartArrayString);
    console.log("cart in local storage: ", localStorage.getItem('storedCart'));
}

function makeClone(thisRoll) {
    // Showing on website. Citation: this is like the createElement in lab06 code
    // make a clone of the cart item template
    const template = document.querySelector('.cart-template'); //??why can't i use ID?
    const clone = template.content.cloneNode(true); //?? what will happen if not take in true?

    // connect this clone to our roll.element
    // from this point we only need to refer to roll.element
    thisRoll.element = clone.querySelector('.cart-item');

    //create the remove button (although it's not a button in my html)
    const btnRemove = thisRoll.element.querySelector('.remove');
    btnRemove.addEventListener('click', () => {
        deleteRoll(thisRoll);
    });

    // add the roll clone to the DOM
    // find the roll parent (#cart-list) and add our roll as its child
    const cartListElement = document.querySelector('#cart-list');
    cartListElement.prepend(thisRoll.element);

    // populate the roll clone with the actual roll content
    updateElement(thisRoll);
    updateTotalPrice();
}

function createRollObj (chosenRoll) { 
    //called when the "add to cart" button is clicked in detail page
    //This is like the submitNote in lab6
    
    let rollType = chosenRoll;

    //get the key that can be used in cart_allGlazing
    cartRollGlazing = convert_allGlazing[rollGlazing]; 
    // console.log("creating roll with rollGlazing", rollGlazing, "->", cartRollGlazing);
    let thisRoll = new Roll(rollType, cartRollGlazing, packSize, basePrice);
    addCart(thisRoll);
}

function addCart (thisRoll) { 
    // Adding to cart array. This is like the addNewNote in lab6
    cart.push(thisRoll);
    saveToLocalStorage();
}

function retrieveFromStorage () {
    const cartArrayString = localStorage.getItem('storedCart');
    const cartRetrieved = JSON.parse(cartArrayString);
    
    console.log("retrieving... ", cartRetrieved);
    for (const arrayRoll of cartRetrieved) {
        const thisRoll = new Roll(arrayRoll.type, arrayRoll.glazing, arrayRoll.size, arrayRoll.basePrice);
        addCart(thisRoll);
    }
}

// function initialize() {
//     const orRoll = {type: 'Original', glazing: 'Sugar Milk', size: 1, basePrice: 2.49, element: null};
//     const waRoll = {type: 'Walnut', glazing: 'Vanilla Milk', size: 12, basePrice: 3.49, element: null};
//     const raRoll = {type: 'Raisin', glazing: 'Sugar Milk', size: 3, basePrice: 2.99, element: null};
//     const apRoll = {type: 'Apple', glazing: 'Original', size: 3, basePrice: 3.49, element: null};

//     const tempRolls = [apRoll, raRoll, waRoll, orRoll];

//     console.log("initialized ", tempRolls);

//     // add the rolls to cart
//     for (let i = 0; i < tempRolls.length; i++) {
//         const tempRoll = tempRolls[i];
//         const thisRoll = new Roll(tempRoll.type, tempRoll.glazing, tempRoll.size, tempRoll.basePrice);
//         // console.log("initializing ", tempRoll, " to ", thisRoll);
//         addCart(thisRoll);
//         makeClone(thisRoll);
//     }
// }

const cart = [];

function checkCurPage() {
    // console.log("curPage: ", localStorage.getItem('curPage'));
    if (localStorage.getItem('curPage') == 'cart') {
        if (localStorage.getItem('storedCart') != null) { 
            console.log("localStorage: ", localStorage.getItem('storedCart'));
            retrieveFromStorage();
            updateTotalPrice();
            for (let thisRoll of cart){
                makeClone(thisRoll);
            }
        }
        else updateTotalPrice();
    }
    else if (localStorage.getItem('curPage') == 'detail' 
             && localStorage.getItem('storedCart') != null) { //?? is the && sign correct?
        retrieveFromStorage(); // no need to make clones of cart item template
    }
}
checkCurPage();