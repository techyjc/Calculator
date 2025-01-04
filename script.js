const calc_buttons = document.querySelector(".calc-buttons");
const calc_input = document.querySelector(".calc-input");
const calc_clear = document.querySelector(".clear-log");
const calc_pwr = document.querySelector(".calc-pwr-switch")
const calc_display = document.querySelector(".calc-input");

let pwrexpanded = calc_pwr.getAttribute("aria-expanded");
let screxpanded = calc_display.getAttribute("aria-expanded");

let calc_logentries = document.querySelector(".log-entries");

let keyValue = "";
let keyDown = false;

const acceptedKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
    "+",
    "-",
    "+",
    "*",
    "/",
    "%",
    "=",
    "c",
    "C",
    "Enter"
];
const acceptedOps = ["+", "-", "*", "/", "%", "=", "Enter"];
const acceptedfunctkeys = ["Alt", "Shift", "Control", "Meta"]

let calcSum = [];
let enteredSum = '';
let displaySum = '';
let resultSum = 0;
let clearCount = 0;

calc_input.readOnly = true;

let myargs = { Key: '', keyFunc: '', keyHold: false, isKeyboard: false };

document.addEventListener("keydown", (e) => {
    if (e.key == "Alt" || e.key == "Shift" || e.key == "Shift") {
        args.keyHold = true;
        args.keyFunc = e.key;
    }
});

// Event Listeners

document.addEventListener("keyup", (e) => {
    myargs.keyHold = false;
});


document.addEventListener("keypress", (e) => {
        myargs.isKeyboard = true;
        myargs.Key = e.key;
        userEntry(myargs);
});

calc_buttons.addEventListener("click", (e) => {
    if (e.target.classList.contains("calc-btn")) {
        myargs.Key = e.target.getAttribute("data-button").toString();
        userEntry(myargs);
    }
});

calc_logentries.addEventListener("click", (e) => {
    let logindex = 0;
    if (e.target.classList.contains("log-entry")) {
        logindex = e.target.getAttribute("data-logindex");
        calc_input.value = cnvt2int((calclog[logindex]));
    }
});

calc_clear.addEventListener("click", (e) => {
});

function isOperator(args) {
    if (acceptedOps.includes(args.Key)) {
        return true;
    }
}

function userEntry(args) {
    if(args.Key == "Enter") { args.Key = "="}
    if(enteredSum.substring(enteredSum.length -1) == "." && args.Key == "."){ return; }
    if(enteredSum == "0" && args.Key == "0"){ return; }
    if(enteredSum === "" && args.Key === "="){ return; }

    if(args.Key == '.' && enteredSum == '' ){
        enteredSum = '0.';
        displaySum = '0.';
        calcDisplay(displaySum);
        return;
    }
    
    if(args.Key == 'c') {
        clear();
        clearCount++;
        if(clearCount == 2) {
            clear(true);
            clearCount = 0;
        }
        return;
    }

    clearCount = 0 ; // Reset clearCount;

    if (isOperator(args)) {
        if(args.Key == "="){
            calcSum.push(enteredSum);
            enteredSum = '';
            resultSum = calcSum.join('');

            calcDisplay(eval(resultSum));
            clear();
            return;
        }

        calcSum.push(enteredSum);
        enteredSum = '';
    }
   
    if (acceptedKeys.includes(args.Key)) {
        enteredSum += args.Key;
        displaySum += args.Key; //Used to display user entry.
    }

    calcDisplay(displaySum);
}

function calcDisplay(output){
    if(output !=""){
        calc_display.value = output;
    }
    
}

function clear(clearDisplay=false) {
    calcSum = [];
    displaySum = '';
    enteredSum = '';
    if(clearDisplay){
        calcDisplay('0');
    }
    console.clear;
}

function testOutput(output) {
    console.log(output);
}