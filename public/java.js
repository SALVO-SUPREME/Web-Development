const theForm = document.getElementById("monkeyBarForm");
const sizeChoice = document.getElementById("size");
const drinkChoice = document.getElementsByName("drinks");
const ingredientsChoice = document.getElementsByName("ingredients");
const baseChoice = document.getElementsByName("bases");
const extrasChoice = document.getElementsByName("extras");
let extraContainer = document.getElementById("extra-container");
let smoothieBases = document.getElementById("smoothie-bases");
let milkshakeBases = document.getElementById("milkshake-bases");
const appleJuice = document.getElementById("appleJuice");
const semiSkimmed = document.getElementById("semiSkimmed")

const currentDrink = document.getElementById("currentDrink");
const txtOutput = document.getElementById("output");
const btnAdd = document.getElementById("add");
const btnCheckout = document.getElementById("checkout");

sizeChoice.addEventListener("change", checkSize);
drinkChoice.forEach(item => item.addEventListener("change", checkDrink));
extrasChoice.forEach(item => item.addEventListener("change", checkExtra));

window.addEventListener("load", initialise);

btnAdd.addEventListener("click", add);
btnCheckout.addEventListener("click", checkout);

let sizeCost;
let extraCost;

function checkSize() {
    let size = sizeChoice.options[sizeChoice.selectedIndex].value;
    if (size == "large") {
        sizeCost = 3.45;
    } else if (size == "medium") {
        sizeCost = 2.95;
    } else {
        sizeCost = 2.45;
    }
    currentDrink.innerText = `£${(sizeCost + extraCost).toFixed(2)}`;
}

function checkExtra() {
    if (this.checked) {
        extraCost += 0.5;
    } else {
        extraCost -= 0.5;
    }
    currentDrink.innerText = `£${(sizeCost + extraCost).toFixed(2)}`;
}

function checkDrink() {
    if (this.value == "smoothie") {
        extraContainer.style.visibility = "hidden";
        milkshakeBases.style.visibility = "hidden";
        smoothieBases.style.visibility = "visible";
        appleJuice.checked = true;
    } else {
        extraContainer.style.visibility = "visible";
        milkshakeBases.style.visibility = "visible";
        smoothieBases.style.visibility = "hidden";
        semiSkimmed.checked = true;
    }
}

function initialise() {
    sizeCost = 2.95;
    extraCost = 0;
    currentDrink.innerText = `£${(sizeCost).toFixed(2)}`;
}

function add() {
    theForm.reset();
    initialise();
}

function checkout() {
    window.alert("Thank You! Your order has been recieved")
    theForm.reset();
    initialise();
}    