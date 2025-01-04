//TODO implement +/- function

const calc_buttons = document.querySelector(".calc-buttons");
const calc_input = document.querySelector(".calc-input");
const calc_clear = document.querySelector(".clear-log");
const calc_pwr = document.querySelector(".calc-pwr-switch")
const calc_display = document.querySelector(".calc-input");

let pwrexpanded = calc_pwr.getAttribute("aria-expanded");
let screxpanded = calc_display.getAttribute("aria-expanded");

let calc_logentries = document.querySelector(".log-entries");

let btnvalue = "";
let calcsum = [];
let calcentry = [];
let inputcount = 0;
let lastuserEntry = "";
let storelastentry = '';
let keyhold = false;
let lastInput = "";
let sumsection = '';
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

calc_pwr.setAttribute("aria-expanded", "false");
calc_display.setAttribute("aria-expanded", "false");

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
        calc_input.value = cnvt2int((calclog[logindex]));
    }
});

calc_clear.addEventListener("click", (e) => {
    clearmyLogs();
    calclog = getmyLog();
    updatemyLogs();
});


// Event Listeners End

// Functions

function entry(keyValue, keyDepressed = false, isKeyboard = false) {
    calc_input.value = 0;

    if (isNaN(keyValue)) {
        keyValue = keyValue.toLowerCase();
    }
    if (keyValue == "enter" || keyValue == "Enter") {
        keyValue = "=";
    }

    //testInput(keyValue, keyDepressed, isKeyboard);

    switch (keyValue) {
        case "c":
            clearSum()
            break;
        case "0":
            break;
        default:
            pwrexpanded = calc_pwr.getAttribute("aria-expanded");

            if(pwrexpanded=="true"){
                appendNum(keyValue, keyDepressed, isKeyboard);
            }
            break;
    }

}



//Calculator Sum Functions

function checkSum(keyValue) {
    let lastIndex = 0;
    let lastvalue = '';
    if (keyValue == '') {
        return;
    }
    if (keyValue == "=") {
        lastIndex = calcentry.length;
        lastvalue = calcentry[calcentry.length - 1];
        if (isOperator(lastvalue)) {
            clearSum();
            return false;
        }
        storelastentry = "";
        calcentry = [];
        return true;
    }
    storelastentry += keyValue
    if (isOperator(keyValue)) {
        calcentry.push(storelastentry);
        storelastentry = '';
    } else {
        calcentry.push(keyValue);
        storelastentry = '';
    }

}

function appendNum(keyValue, keyDepressed, isKeyboard) {
    lastuserEntry += keyValue.toString();
    if (isOperator(keyValue) == false) {
        sumsection += keyValue.toString();
    }
    if (isOperator(keyValue)) {
        decCheck(keyValue);
        if (keyValue == "=") {
            calcsum.push(sumsection);
            sumsection = "";
            if (checkSum(keyValue)) {
                try {
                    //console.log(calcsum); // Display captured value
                    calc_input.value = doSum();
                    return
                }
                catch (err) {
                    clearSum();
                }
            };
        } else {
            calcsum.push(sumsection);
            calcsum.push(keyValue);
            sumsection = "";
        }
    }
    calc_input.value = lastuserEntry;
}

function doSum() {
    let sumValue = "";
    sumValue = calcsum.join("");
    addlogentry(sumValue);
    clearSum();
    return eval(sumValue);
}

function clearSum() {
    lastuserEntry = "";
    storelastentry = "";
    calcsum = [];
    calcentry = [];
    storelastentry = "";
}

// Calculator Sum Functions End

// General Functions

function negnums(value) {
    const sum = value.reverse();
    sum.forEach((section, index) => {
        if (isNaN(section)) {
            console.log("Section:" + index + " " + section);
        }
    })
    sum = '';
}

function decCheck(keyValue) {
    if (keyValue == "." && lastuserEntry == 0) {
        lastuserEntry = "0.";
        calc_input.value = lastuserEntry;
    }
}

function isOperator(keyValue) {
    if (acceptedops.includes(keyValue)) {
        return true;
    } else {
        return false;
    }
}

function stringLength(currentuserEntry) {
    if (currentuserEntry.length > 0) {
        return true;
    } else {
        return false;
    }
}

function cnvt2int(value) {
    if (value.includes(".")) {
        value = eval(value);
        value = parseFloat(value).toFixed(decimalplaces);
    } else {
        value = eval(value);
        value = parseInt(value);
    }
    return value;
}

// General Functions End

//Calculatior Log Functions

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

function testInput(keyValue, keyDepressed, isKeyboard) {
    console.log("Enter Value:" + keyValue);
    console.log("Key Depressed:" + keyDepressed);
    console.log("Keyboard:" + isKeyboard);
    console.log("Operator:" + isOperator(keyValue));
    console.log("Last Entry:" + lastuserEntry);
}

updatemyLogs();

// Calculatior Log Functions End

// Calculator Power

calc_pwr.addEventListener("click", () => {


    if (pwrexpanded == "false") {
        clearSum()
        calc_input.value = 0;
        calc_pwr.setAttribute("aria-expanded", "true");
        calc_display.setAttribute("aria-expanded", "true");
        pwrexpanded = calc_pwr.getAttribute("aria-expanded");
        screxpanded = calc_display.getAttribute("aria-expanded");
    } else {
        calc_pwr.setAttribute("aria-expanded", "false");
        calc_display.setAttribute("aria-expanded", "false");
        pwrexpanded = calc_pwr.getAttribute("aria-expanded");
        screxpanded = calc_display.getAttribute("aria-expanded");
        clearSum()
        calc_input.value = 0;
    }
});

// Calculator Power End