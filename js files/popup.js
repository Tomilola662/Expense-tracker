const generateButton = document.querySelector(".generate-button");
const overlay = document.querySelector(".overlay");
const popupContent = document.querySelector(".popup-content");
const budget = document.querySelector(".generated-budget");
const directBtn = document.querySelector(".direct-btn");
const btnGroup = document.querySelector(".btn-group");
const closePopup = document.querySelector(".close-popup");
const useBudget = document.querySelector(".use-budget");
const anotherBtn = document.querySelector(".another-budget");
let randomAmount = null;

generateButton.addEventListener("click", () => {
  const min = 1000000;
  const max = 10000000;
  randomAmount = Math.floor(Math.random() * (max - min + 1)) + min;

  generateButton.style.display = "none";
  btnGroup.style.display = "flex";
  budget.innerHTML = `<p class="budget">${formatCurrency(randomAmount)}</p>`;
});

anotherBtn.addEventListener("click", () => {
  const min = 1000000;
  const max = 10000000;
  randomAmount = Math.floor(Math.random() * (max - min + 1)) + min;
  budget.innerHTML = `<p class="budget">${formatCurrency(randomAmount)}</p>`;
});
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
  overlay.style.display = "block";
  popupContent.style.display = "block";
});

//use budget
useBudget.addEventListener("click", () => {
  popupContent.style.display = "none";
  overlay.style.display = "none";

  localStorage.setItem("startingBalance", randomAmount);
  updateBalance();
  updateSummary();
});
