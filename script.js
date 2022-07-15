// script file for EAS
let drawingColor = "rgba(0,0,0,1.0)";
let shadingColor = "rgba(0,0,0,0.1)";
let shader = false;
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
  const initialColorShade = "rgba(0,0,0,0.1)";
  console.log(element);
  let color = element.style.background;

  if (shader) {
    if (color === "") {
      element.style.background = initialColorShade;

      console.log(2);
    } else {
      let newColor = incrementColorShade(color);
      element.style.background = newColor;
    }
  } else {
    element.style.background = drawingColor;
  }
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

  if (color.id === "red") {
    if (drawingColor === "rgba(255,0,0,1)") {
      drawingColor = "rgba(0,0,0,1)";
      color.classList.toggle("red");
    } else {
      drawingColor = "rgba(255,0,0,1)";
      color.classList.toggle("red");
    }
  } else if (color.id === "blue") {
    if (drawingColor === "rgba(0,0,255,1)") {
      drawingColor = "rgba(0,0,0,1)";
      color.classList.toggle("blue");
    } else {
      drawingColor = "rgba(0,0,255,1)";
      color.classList.toggle("blue");
    }
  } else if (color.id === "green") {
    if (drawingColor === "rgba(255,0,0,1)") {
      drawingColor = "rgba(0,255,0,1)";
      color.classList.toggle("green");
    } else {
      drawingColor = "rgba(0,255,0,1)";
      color.classList.toggle("green");
    }
  } else if (color.id === "random") {
    if (color.classList.contains("random")) {
      drawingColor = "rgba(0,0,0,1)";
      color.classList.toggle("random");
    } else {
      drawingColor = randomColor();
      color.classList.toggle("random");
    }
  } else if (color.id === "shader") {
    if (shader === false) {
      shader = true;
      color.classList.toggle("shader");
    } else {
      shader = false;
      shadingColor = "rgba(0,0,0,0.1)";
      color.classList.toggle("shader");
    }
  }
};

// generates a random color
const randomColor = () => {
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);

  return `rgba(${red},${blue},${green},1)`;
};

// get rgba values

const extractRGBA = (color) => {
  let lastNumber = color.match(
    /rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/
  );

  return lastNumber[7];
};

// applies a 10% shade increase
const incrementColorShade = (color) => {
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
};

// add eventlisteners to color picker buttons
const colors = document.querySelectorAll(".color");
colors.forEach((color) => color.addEventListener("click", colorPicker));
