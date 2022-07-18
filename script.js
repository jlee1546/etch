// script file for EAS
let drawingColor = "rgba(0,0,0,1.0)";
let shadingColor = "rgba(0,0,0,0.1)";
let shader = false;

//  TURNS POWER ON TO THE GAME AND ACTIVATES EVENTLISTENERS
function poweredOn() {
  let power = document.querySelector("#powerButton");
  let wrapper = document.querySelector(".wrapper");
  drawingColor = "rgba(0,0,0,1.0)";

  power.classList = "";
  power.classList = "powerOn";

  numberDivs(16);
  gridSize(16);
  addListenerToDivs();

  wrapper.style.background = "grey";

  // Button eventlisteners

  // add eventlistener to clear button
  document.querySelector(".clear").addEventListener("click", clearScreen);

  // add eventlistener to change button
  document.querySelector(".change").addEventListener("click", changeGridSize);

  // add eventlisteners to color picker buttons
  const colors = document.querySelectorAll(".color");
  colors.forEach((color) => color.addEventListener("click", colorPicker));
}

// TURNS POWER OFF TO THE GAME AND DEACTIVATES EVENTLISTENERS
function poweredOff() {
  let power = document.querySelector("#powerButton");
  let wrapper = document.querySelector(".wrapper");

  power.classList = "";
  power.classList = "powerOff";

  removeDivs();

  toggleOffOtherClasses();

  wrapper.style.background = "rgba(0,0,0,1.0)";

  // Remove event listeners

  // remove eventlistener to clear button
  document.querySelector(".clear").removeEventListener("click", clearScreen);

  // remove eventlistener to change button
  document
    .querySelector(".change")
    .removeEventListener("click", changeGridSize);

  // remove eventlisteners to color picker buttons
  const colors = document.querySelectorAll(".color");
  colors.forEach((color) => color.removeEventListener("click", colorPicker));
}

// swap image on power button
function turnOnPower() {
  let power = document.querySelector("#powerButton");
  power.classList.contains("powerOff") ? poweredOn() : poweredOff();
}

// add event listener to power button
document.querySelector("#powerButton").addEventListener("click", turnOnPower);

// creates new div elements
function createDiv() {
  const newDiv = document.createElement("div");
  return newDiv;
}

// adds new div to .wrapper container
function addDiv() {
  const wrapper = document.querySelector(".wrapper");
  wrapper.appendChild(createDiv());
}

// controls number of divs put into .wrapper container
function numberDivs(number) {
  let numberOfDivs = number ** 2;
  for (let i = 1; i <= numberOfDivs; i++) {
    addDiv();
  }
}

// change grid size
function gridSize(number) {
  const wrapper = document.querySelector(".wrapper");
  wrapper.style.cssText = `grid-template-columns: repeat(${number}, 1fr)`;
}

// change background color of div when mouse over
function changeBackgroundColor(e) {
  const element = e.target;
  const initialColorShade = "rgba(0,0,0,0.1)";

  let color = element.style.background;

  if (shader) {
    if (color === "" || !color.includes("a")) {
      element.style.background = initialColorShade;
    } else {
      let newColor = incrementColorShade(color);

      element.style.background = newColor;
    }
  } else {
    element.style.background = drawingColor;
  }
}

// change individual background to random color
function changeBackgroundRandomColor(e) {
  let element = e.target;

  element.style.background = randomColor();
}

// add eventlistener to all divs within .wrapper
function addListenerToDivs() {
  const divs = document.querySelectorAll(".wrapper div");
  divs.forEach((div) =>
    div.addEventListener("mouseover", function (e) {
      let randomButton = document.querySelector("#random");
      return randomButton.classList.contains("random")
        ? changeBackgroundRandomColor(e)
        : changeBackgroundColor(e);
    })
  );
}

// clears the screen (reverts divs to original color)
function clearScreen() {
  let wrapper = document.querySelector(".wrapper");

  drawingColor = "rgba(0,0,0,1.0)";
  toggleOffOtherClasses();
  shader = false;

  removeDivs();
  numberDivs(16);
  gridSize(16);
  addListenerToDivs();
  wrapper.style.background = "grey";
}

function changeGridSize() {
  let wrapper = document.querySelector(".wrapper");
  let inputNumber;
  let flag = false;

  while (!flag) {
    inputNumber = prompt("Integer 1 to 100");

    if (inputNumber === null || inputNumber === "") {
      return;
    } else if (isNaN(+inputNumber) || +inputNumber < 1 || +inputNumber > 100) {
      alert("Please input a valid integer between 1 and 100");
    } else {
      flag = true;
    }
  }
  removeDivs();
  numberDivs(inputNumber);
  gridSize(inputNumber);
  addListenerToDivs();
  wrapper.style.background = "grey";
}

// remove divs from .wrapper
function removeDivs() {
  const divs = document.querySelectorAll(".wrapper div");
  for (const div of divs) {
    div.remove();
  }
}

// changes the color of the divs
function colorPicker(e) {
  const color = e.target;

  if (color.id === "red") {
    if (drawingColor === "rgba(255,0,0,1)") {
      drawingColor = "rgba(0,0,0,1)";
      color.classList.toggle(color.id);
    } else {
      drawingColor = "rgba(255,0,0,1)";
      color.classList.toggle(color.id);
      toggleOffOtherClasses(color.id);
      shader = false;
    }
  } else if (color.id === "blue") {
    if (drawingColor === "rgba(0,0,255,1)") {
      drawingColor = "rgba(0,0,0,1)";
      color.classList.toggle(color.id);
    } else {
      drawingColor = "rgba(0,0,255,1)";
      color.classList.toggle(color.id);
      toggleOffOtherClasses(color.id);
      shader = false;
    }
  } else if (color.id === "green") {
    if (drawingColor === "rgba(0,255,0,1)") {
      drawingColor = "rgba(0,0,0,1)";
      color.classList.toggle(color.id);
    } else {
      drawingColor = "rgba(0,255,0,1)";
      color.classList.toggle(color.id);
      toggleOffOtherClasses(color.id);
      shader = false;
    }
  } else if (color.id === "random") {
    if (color.classList.contains(color.id)) {
      drawingColor = "rgba(0,0,0,1)";
      color.classList.toggle(color.id);
    } else {
      drawingColor = randomColor();
      color.classList.toggle(color.id);
      toggleOffOtherClasses(color.id);
      shader = false;
    }
  } else if (color.id === "shader") {
    if (shader === false) {
      shader = true;
      color.classList.toggle(color.id);
      drawingColor = "rgba(0,0,0,1.0)";
      toggleOffOtherClasses(color.id);
    } else {
      color.classList.toggle(color.id);
      toggleOffOtherClasses(color.id);
      shader = false;
    }
  }
}

// toggles off other buttons when current button is activated
function toggleOffOtherClasses(className) {
  let colorPickerButtons = document.querySelectorAll(".color");

  for (let i = 0; i <= colorPickerButtons.length - 1; i++) {
    if (!(colorPickerButtons[i].id === className)) {
      colorPickerButtons[i].classList.remove(colorPickerButtons[i].id);
    }
  }
}

// generates a random color
function randomColor() {
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);

  return `rgba(${red},${blue},${green},1)`;
}

// get rgba values
function extractRGBA(color) {
  let lastNumber = color.match(
    /rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/
  );

  return lastNumber[7];
}

// applies a 10% shade increase
function incrementColorShade(color) {
  let shadedColor = color;

  let newShadedColor = shadedColor.match(
    /rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/
  );
  let increment = 0.1;
  let alpha = +newShadedColor[7];

  if (alpha < 0.9) {
    alpha += increment;
  }
  return `rgba(${+newShadedColor[1]},${+newShadedColor[3]},${+newShadedColor[5]},${alpha})`;
}
