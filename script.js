// script file for EAS
let drawingColor = "black";
// draws the inital grid
window.addEventListener("load", function () {
  numberDivs(16);
  gridSize(16);
  addListenerToDivs();
});
// creates new div elements
const createDiv = () => {
  const newDiv = document.createElement("div");
  return newDiv;
};

// adds new div to .wrapper container
const addDiv = () => {
  const wrapper = document.querySelector(".wrapper");
  wrapper.appendChild(createDiv());
};

// controls number of divs put into .wrapper container
const numberDivs = (number) => {
  let numberOfDivs = number ** 2;
  for (let i = 1; i <= numberOfDivs; i++) {
    addDiv();
  }
};

// change grid size
const gridSize = (number) => {
  const wrapper = document.querySelector(".wrapper");
  wrapper.style.cssText = `grid-template-columns: repeat(${number}, 1fr)`;
};

// change background color of div when mouse over
const changeBackgroundColor = (e) => {
  const element = e.target;
  element.style.cssText = `background: ${drawingColor} `;
};

// add eventlistener to all divs within .wrapper
const addListenerToDivs = () => {
  const divs = document.querySelectorAll(".wrapper div");
  divs.forEach((div) =>
    div.addEventListener("mouseover", changeBackgroundColor)
  );
};

// clears the screen (reverts divs to original color)
const clearScreen = () => {
  drawingColor = "black";
  removeDivs();
  numberDivs(16);
  gridSize(16);
  addListenerToDivs();
};

const changeGridSize = () => {
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
};

// add eventlistener to clear button
document.querySelector(".clear").addEventListener("click", clearScreen);

// add eventlistener to change button
document.querySelector(".change").addEventListener("click", changeGridSize);

// remove divs from .wrapper
const removeDivs = () => {
  const divs = document.querySelectorAll(".wrapper div");
  for (const div of divs) {
    div.remove();
  }
};

// changes the color of the divs
const colorPicker = (e) => {
  const color = e.target;
  console.log(color.id);
  if (color.id === "red") {
    drawingColor = "red";
  } else if (color.id === "blue") {
    drawingColor = "blue";
  } else if (color.id === "green") {
    drawingColor = "green";
  } else if (color.id === "random") {
    drawingColor = randomColor();
  }
};

// generates a random color
const randomColor = () => {
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);

  return `rgb(${red},${blue},${green})`;
};

// add eventlisteners to color picker buttons
const colors = document.querySelectorAll(".color");
colors.forEach((color) => color.addEventListener("click", colorPicker));
