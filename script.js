const calc_buttons = document.querySelector(".calc-buttons");
const calc_input = document.querySelector(".calc-input");
const calc_clear = document.querySelector(".clear-log");
const calc_pwr = document.querySelector(".calc-pwr-switch")
const calc_display = document.querySelector(".calc-input");
const calc_funcdisplay = document.querySelector(".func-display")

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

const tooltip_info = [{key: ".", tooltip: "Decimal Point"}, {key: "c", tooltip: "Clear (Press twice to clear display)"},{key: "0", tooltip: "0"},,{key: "1", tooltip: "1"},{key: "2", tooltip: "2"},{key: "3", tooltip: "3"},{key: "4", tooltip: "4"},{key: "5", tooltip: "5"},{key: '6', tooltip: "6"},{key: "7", tooltip: "7"},{key: "8", tooltip: "8"},{key: "9", tooltip: "9"},{key: "%", tooltip: "Modulus"},{key: "/", tooltip: "Division"},{key: "*", tooltip: "Multiplication"}, {key: "-", tooltip: "Subtraction"},{key: "+", tooltip: "Addition"},{key: "=", tooltip: "Sum"}];

let calcSum = [];
let enteredSum = '';
let displaySum = '';
let resultSum = 0;
let clearCount = 0;
let calclog = getmyLog();

calc_input.readOnly = true;

power();

let myargs = { Key: '', keyFunc: '', keyHold: false, isKeyboard: false };



document.addEventListener("keydown", (e) => {
    if (e.key == "Alt" || e.key == "Shift" || e.key == "Shift") {
        args.keyHold = true;
        args.keyFunc = e.key;
    }else{
        myargs.isKeyboard = true;
        myargs.Key = e.key;
        userEntry(myargs);
    }
});

// Event Listeners

document.addEventListener("keyup", (e) => {
    myargs.keyHold = false;
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
        calc_input.value = eval(calclog[logindex]);
    }
});

calc_clear.addEventListener("click", (e) => {
    clearmyLogs();
    calclog = getmyLog();
    updatemyLogs();
});

calc_pwr.addEventListener("click", (e) => {
    power(true);
});

function isOperator(args) {
    if (acceptedOps.includes(args.Key)) {
        return true;
    }
}

function power(appStart = false) {
    if (appStart == false) {
        calc_clear.disabled = true;
        calclog = [];
        updatemyLogs();
        clear(true);
        return;
    }
    if (pwrexpanded == "false") {
        calc_pwr.setAttribute("aria-expanded", "true");
        pwrexpanded = calc_pwr.getAttribute("aria-expanded");
        calc_clear.disabled = false;
        calclog = getmyLog();
        updatemyLogs();
        clear(true);
    } else {
        calc_pwr.setAttribute("aria-expanded", "false");
        pwrexpanded = calc_pwr.getAttribute("aria-expanded");
        calclog = [];
        calc_clear.disabled = true;
        updatemyLogs();
        clear(true);
    }
}

function userEntry(args) {
    if (pwrexpanded == "false") { return; }
    if (args.Key == "Enter") { args.Key = "=" }
    if (enteredSum.substring(enteredSum.length - 1) == "." && args.Key == ".") { return; }
    if (enteredSum == "0" && args.Key == "0") { return; }
    if (enteredSum === "" && args.Key === "=") { return; }

    if (args.Key == '.' && enteredSum == '') {
        enteredSum = '0.';
        displaySum = '0.';
        calcDisplay(displaySum);
        return;
    }

    if (args.Key == 'c') {
        clear();
        clearCount++;
        if (clearCount == 2) {
            clear(true);
            clearCount = 0;
        }
        return;
    }

    clearCount = 0; // Reset clearCount;

    if (isOperator(args)) {
        if (args.Key == "=") {
            try {
                calcSum.push(enteredSum);
                enteredSum = '';
                resultSum = calcSum.join('');
                calcDisplay(eval(resultSum));
                addlogentry(resultSum) // Add the Sum to the calculator log.

                clear();
                return;
            } catch (err) {
                return;
            }
        }
        lastFunc(args.Key);
        calcSum.push(enteredSum);
        enteredSum = '';
    }

    if (acceptedKeys.includes(args.Key)) {
        enteredSum += args.Key;
        displaySum += args.Key; //Used to display user entry.
    }

    calcDisplay(displaySum);
}

function calcDisplay(output) {
    if (output != "") {
        calc_display.value = output;
    }

}

function lastFunc(value="",cleardisp=false){
    if(cleardisp) {
        calc_funcdisplay.innerHTML = "";
    }else{
        calc_funcdisplay.innerHTML =`<li><strong>Last Opertation:</strong> ${value}</li class="op-sym">`;
    }
}

function clear(clearDisplay = false) {
    calcSum = [];
    displaySum = '';
    enteredSum = '';
    lastFunc("",true);
    if (clearDisplay) {
        calcDisplay('0');
    }
    console.clear;
}

//Calculatior Log Functions

function addlogentry(value) {
    let count = 1;
    calc_logentries.innerHTML = "";
    calclog.push(value);
    calclog.forEach((sum, index) => {
        let newlogentry = document.createElement("li");
        newlogentry.classList.add("log-entry");
        newlogentry.innerHTML = "<strong>" + count + ")</strong> " + sum + "=" + eval(sum);
        newlogentry.setAttribute("data-logindex", index);
        count++;
        calc_logentries.appendChild(newlogentry);
    });
    savemyLog();
}

function savemyLog() {
    const mylogJson = JSON.stringify(calclog);
    localStorage.setItem("calclog", mylogJson);
}

function getmyLog() {
    const logs = localStorage.getItem("calclog") || "[]";
    return JSON.parse(logs);
}

function updatemyLogs() {
    let count = 1;
    calc_logentries.innerHTML = "";
    calclog.forEach((sum, index) => {
        let newlogentry = document.createElement("li");
        newlogentry.classList.add("log-entry");
        newlogentry.innerHTML = "<strong>" + count + ")</strong> " + sum + "=";
        newlogentry.setAttribute("data-logindex", index);
        count++;
        calc_logentries.appendChild(newlogentry);
    });
}

function clearmyLogs() {
    localStorage.removeItem("calclog");
}

// Calculatior Log Functions End

updatemyLogs();
tooltips();

function tooltips(){
    // tooltip_info
    const btns = document.querySelectorAll(".calc-btn");
    btns.forEach((key)=>{
        let keyData = key.getAttribute('data-button');
        tooltip_info.forEach((tip)=>{
            if(String(tip.key) == String(keyData)){
            
                key.setAttribute("Title",tip.tooltip);
               
            }
        });
    });
}

function testOutput(output) {
    console.log(output);
}