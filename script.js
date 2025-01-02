const calc_buttons = document.querySelector(".calc-buttons");
const calc_input = document.querySelector(".calc-input");
const calc_clear = document.querySelector(".clear-log");
let calc_logentries = document.querySelector(".log-entries");

const decimalplaces = 2;
let btnvalue = "";
let calcsum = [];
let inputcount = 0;
let userEntry = "";
let result = 0;
let keyhold = false;
let isOperator = false;
let lastInput = "";
const acceptedkeys = [
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
const acceptedops = ["+", "-", "*", "/", "%", "=", "Enter"];

calc_input.readOnly = true;

calc_input.value = 0;
let calclog = getmyLog();

document.addEventListener("keydown", (e) => {
    if (e.key == "Alt") {
        keyhold = true;
    }
});

// Event Listeners

document.addEventListener("keyup", (e) => {
    if (e.key == "Alt") {
        keyhold = false;
    }
});

document.addEventListener("keypress", (e) => {
    if (acceptedkeys.includes(e.key)) {
        entry(e.key, keyhold, true);
    }
});

calc_buttons.addEventListener("click", (e) => {
    if (e.target.classList.contains("calc-num")) {
        btnvalue = parseInt(e.target.getAttribute("data-button"));
        entry(btnvalue, keyhold);
    }

    if (e.target.classList.contains("calc-func")) {
        btnvalue = e.target.getAttribute("data-button");
        if (btnvalue != "") {
            entry(btnvalue, keyhold);
        }
    }
});

calc_logentries.addEventListener("click", (e) => {
    let logindex = 0;
    if (e.target.classList.contains("log-entry")) {
        logindex = e.target.getAttribute("data-logindex");
        calc_input.value = numbertype(calclog[logindex]);
    }
});

calc_clear.addEventListener("click", (e) => {
    clearmyLogs();
    calclog = getmyLog();
    updatemyLogs();
});

// Functions

function entry(keyValue, keyDepressed = false, isKeyboard = false) {
    calc_input.value = 0;

    console.log("String:" + isNaN(keyValue));

    if (isNaN(keyValue)) {
        keyValue = keyValue.toLowerCase();
    }

    if (acceptedops.includes(keyValue)) {
        isOperator = true;
    }else{
        isOperator = false;
    }

    testInput(keyValue, keyDepressed, isKeyboard);

    switch (keyValue) {
        case "c":
            userEntry = "";
            calcsum = [];
            console.clear();
            break;
        case "enter" || "=":
            userEntry = "";
            calcsum = [];
            break;
        case ".":
            break;
        default:
            userEntry += String(keyValue);
            calc_input.value = userEntry;
            break;
    }
}

function stringLength(keyValue) {
    if (userinput.length > 0) {
        return true;
    } else {
        return false;
    }
}

function decCheck(keyValue){

}

function numbertype(value) {
    if (value.includes(".")) {
        value = eval(value);
        value = parseFloat(value).toFixed(decimalplaces);
    } else {
        value = eval(value);
        value = parseInt(value);
    }
    return value;
}

function output() {
    let finalvalue = calcsum.join("");
    return finalvalue;
}

function addlogentry(value) {
    let count = 1;
    calc_logentries.innerHTML = "";
    calclog.push(value);
    calclog.forEach((sum, index) => {
        let newlogentry = document.createElement("li");
        newlogentry.classList.add("log-entry");
        newlogentry.innerHTML = "<strong>" + count + ")</strong> " + sum + "=";
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

function testInput(keyValue,keyDepressed,isKeyboard){
    console.log("Enter Value:" + keyValue);
    console.log("Key Depressed:" + keyDepressed);
    console.log("Keyboard:" + isKeyboard);
    console.log("Operator:" + isOperator);
}

updatemyLogs();
