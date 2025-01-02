const calc_buttons = document.querySelector(".calc-buttons");
const calc_input = document.querySelector(".calc-input");
const calc_clear = document.querySelector(".clear-log");
let calc_logentries = document.querySelector(".log-entries");

const decimalplaces = 2;
let btnvalue = "";
let calcsum = [];
let inputcount = 0;
let userinput = "";
let result = 0;
let keyhold = false;
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
const acceptedops = ["+", "-", "*", "/", "%", "=","Enter"];

calc_input.readOnly = true;

calc_input.value = 0;
let calclog = getmyLog();

document.addEventListener("keydown", (e) => {
  if (e.key = "Alt") {
    keyhold = true;
  }
});

document.addEventListener("keyup", (e) => {
  if ((e.key = "Alt")) {
    keyhold = false;
  }
});

document.addEventListener("keypress", (e) => {
  if (acceptedkeys.includes(e.key)) {
    displayentry(e.key);
  }
});

calc_buttons.addEventListener("click", (e) => {
  if (e.target.classList.contains("calc-num")) {
    btnvalue = parseInt(e.target.getAttribute("data-button"));
    displayentry(btnvalue);
  }

  if (e.target.classList.contains("calc-func")) {
    btnvalue = e.target.getAttribute("data-button");
    if (btnvalue != "") {
      displayentry(btnvalue);
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

function displayentry(value) {
  calc_input.value = "";
  
  console.log(value);
  if(value == 'enter' || value == 'Enter'){
    value = '=';
  }

  if (typeof value === "string") {
    value = value.toLowerCase();
  }

  if (userinput.length < 0) {
    console.log("string Length:" + userinput.length);
    if (acceptedops.includes(value)) {
      return 0;
    }
  }

  if (value == "c") {
    userinput = "";
    calcsum = [];
    console.clear();
    return 0;
  }

  if (value == "+/-") {
    console.log(calc_input.value);
    //TODO
    return 0;
  }

  if (value != "=") {
    if (String(calc_input.value) == "0" || String(calc_input.value) === 0) {
    } else {
      if (acceptedops.includes(value)) {
        calcsum.push(userinput);
        calcsum.push(value);
        userinput = "";
      } else {
        if (value == "." && userinput == 0) {
          userinput = "0.";
          value = "";
        }
        if (value == "." && userinput.includes(".")) {
          value = "";
        }
        userinput += String(value);
      }
      calc_input.value = output() + "" + String(userinput);
    }
  } else {
    calcsum.push(userinput);
    userinput = "";
    calc_input.value = numbertype(output());
    addlogentry(output());
    calcsum = [];
  }
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

updatemyLogs();
