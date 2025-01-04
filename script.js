const calc_buttons = document.querySelector(".calc-buttons");
const calc_input = document.querySelector(".calc-input");
const calc_clear = document.querySelector(".clear-log");
const calc_pwr = document.querySelector(".calc-pwr-switch")
const calc_display = document.querySelector(".calc-input");

let pwrexpanded = calc_pwr.getAttribute("aria-expanded");
let screxpanded = calc_display.getAttribute("aria-expanded");

let calc_logentries = document.querySelector(".log-entries");

let btnvalue = "";

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

});

