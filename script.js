const display = document.getElementById("display");

let currentInput = "";

function appendNumber(num) {
  currentInput += num;
  updateDisplay();  
}

function appendOperator(op) {
  if (currentInput !== "" && !/[+\-*/]$/.test(currentInput)) {
    currentInput += op;
    updateDisplay();
  }
}

function appendDot() {
  let parts = currentInput.split(/[\+\-\*\/]/);
  if (!parts[parts.length - 1].includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = "";
  updateDisplay("0"); 
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    let result = eval(currentInput);
    currentInput = result.toString();
    updateDisplay();
  } catch {
    updateDisplay("Error");
    currentInput = "";
  }
}

function updateDisplay(value = currentInput) {
  display.textContent = value || "0"; 
}


document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key)) {
    appendNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendOperator(key);
  } else if (key === "." || key === ",") {
    appendDot(); 
  } else if (key === "Enter" || key === "=") {
    e.preventDefault(); 
    calculate(); 
  } else if (key === "Backspace") {
    deleteLast(); 
  } else if (key === "Escape") {
    clearDisplay(); 
  }
});


const themeSwitcher = document.getElementById("themeSwitcher");
const themeLabel = document.getElementById("themeLabel");

if (document.body.classList.contains("light-mode")) {
  themeLabel.textContent = "Dark Mode →";
  themeLabel.style.color = "black";
} else {
  themeLabel.textContent = "Light Mode →";
  themeLabel.style.color = "white";
}

themeSwitcher.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeLabel.textContent = "Dark Mode →";
    themeLabel.style.color = "black";
  } else {
    themeLabel.textContent = "Light Mode →";
    themeLabel.style.color = "white";
  }
});