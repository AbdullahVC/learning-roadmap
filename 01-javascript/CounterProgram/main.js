const decreaseButton = document.getElementById("decrementBtn");
const increaseButton = document.getElementById("incrementBtn");
const resetButton = document.getElementById("resetBtn");
const counterDisplay = document.getElementById("countLabel");
let count = 0;

increaseButton.onclick = function () {
  count++;
  counterDisplay.textContent = count;
};

decreaseButton.onclick = function () {
  count--;
  counterDisplay.textContent = count;
};

resetButton.onclick = function () {
  count = 0;
  counterDisplay.textContent = count;
};
