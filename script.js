// script file for EAS
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
  console.log(element);
  element.classList.add("blue");
};

// add eventlistener to all divs within .wrapper
const addListenerToDivs = () => {
  const divs = document.querySelectorAll(".wrapper div");
  divs.forEach((div) =>
    div.addEventListener("mouseover", changeBackgroundColor)
  );
};
