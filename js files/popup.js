const generateButton = document.getElementById("gb-container");
const overlay = document.querySelector(".overlay");
const popupContent = document.querySelector(".popup-content");
const budget = document.querySelector(".generated-budget");
const directBtn = document.querySelector(".direct-btn");
const btnGroup = document.querySelector(".btn-group");
const closePopup = document.querySelector(".close-popup");
const anotherBtn = document.querySelector(".another-budget");
let randomAmount = null;

generateButton.addEventListener("click", () => {
  const min = 1000000;
  const max = 10000000;
  randomAmount = Math.floor(Math.random() * (max - min + 1)) + min;

  generateButton.style.display = "none";
  btnGroup.style.display = "block";
  btnGroup.innerHTML = `<button class="use-budget" onclick="useBudget()">Use Budget</button>
                      <button class="another-budget" onclick="generateAnother()">Generate Another</button>`;
  budget.innerHTML = `<p class="budget">${formatCurrency(randomAmount)}</p>`;
});

function generateAnother() {
  console.log("working");
  const min = 1000000;
  const max = 10000000;
  randomAmount = Math.floor(Math.random() * (max - min + 1)) + min;
  budget.innerHTML = `<p class="budget">${formatCurrency(randomAmount)}</p>`;
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
}

directBtn.addEventListener("click", () => {
  popupContent.style.display = "none";
  overlay.style.display = "none";
});

closePopup.addEventListener("click", () => {
  popupContent.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  popupContent.style.display = "none";
});

// displaying modal on screen load
window.addEventListener("load", () => {
  const startingBalance = Number(localStorage.getItem("startingBalance"));
  if (startingBalance) return;
  overlay.style.display = "block";
  popupContent.style.display = "block";
});

//use budget
function useBudget() {
  popupContent.style.display = "none";
  overlay.style.display = "none";

  localStorage.setItem("startingBalance", randomAmount);
  updateBalance();
  updateSummary();
}
