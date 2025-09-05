const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const formElement = document.getElementById("transaction-form");
const radioOne = document.getElementById("income-radio");
const radioTwo = document.getElementById("expenses-radio");
const transactionContainer = document.querySelector(".t-boxes");
//toggling transaction button
const transactionBtn = document.querySelector(".transaction-btn");
const transactionSection = document.querySelector(".transactions-section");
const closeBtn = document.getElementById("close-btn");
const resetBtn = document.querySelector(".reset-button");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const descriptionValue = descriptionInput.value;
  const amountValue = Number(amountInput.value);
  const currentTimestamp = new Date().toLocaleString();

  transactions.push({
    id: Date.now(),
    desc: descriptionValue,
    amount: amountValue,
    type: radioOne.checked ? "plus" : "minus",
    currentTimestamp,
  });
  transactions = transactions.reverse(); // to make the newest transaction appear at the top
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactions();
  updateBalance();
  updateSummary();
  descriptionInput.value = "";
  amountInput.value = "";
  radioOne.checked = false;
  radioTwo.checked = false;
});

function updateTransactions() {
  transactionContainer.innerHTML = ""; //to clear the previous created elemnt from the previous (old) array in memory
  transactions.forEach((transaction) => {
    const newContainer = document.createElement("div");
    newContainer.classList.add("t-box");
    newContainer.innerHTML = `<div>
                                <p>${transaction.desc}</p>
                                <div>
                                <span id="amount-value">${formatCurrency(
                                  transaction.amount
                                )}</span>
                                </div> 
                              </div>
                              <div class="time-box">
                                <p>${transaction.currentTimestamp}</p>
                                <div class="delete-box">
                                <button onclick="deleteTransaction(${
                                  transaction.id
                                })">delete</button>
                                </div>
                              </div>
                              `;
    transactionContainer.appendChild(newContainer);
    transaction.type == "plus"
      ? newContainer.classList.add("green")
      : newContainer.classList.add("red");
  });
}

function updateBalance() {
  const balanceElement = document.getElementById("balance");
  const startingBalance = Number(localStorage.getItem("startingBalance")) || 0;

  const balance = transactions.reduce((acc, item) => {
    if (item.type == "minus") return acc - item.amount;
    return acc + item.amount;
  }, 0);

  const totalBalance = balance + startingBalance;
  balanceElement.innerText = formatCurrency(totalBalance);
}

function updateSummary() {
  const incomeElement = document.getElementById("income");
  const expensesElement = document.getElementById("expenses");

  const allIncome = transactions.filter(
    (transaction) => transaction.type == "plus"
  );
  const startingBalance = Number(localStorage.getItem("startingBalance")) || 0;

  const totalIncome = allIncome.reduce((acc, item) => acc + item.amount, 0);
  incomeElement.innerText = formatCurrency(totalIncome + startingBalance);

  const allExpenses = transactions.filter(
    (transaction) => transaction.type == "minus"
  );
  const totalExpenses = allExpenses.reduce((acc, item) => acc + item.amount, 0);
  expensesElement.innerText = formatCurrency(totalExpenses);
}

function deleteTransaction(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this transaction?"
  );
  if (!confirmDelete) return;

  transactions = transactions.filter((item) => item.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateTransactions();
  updateSummary();
  updateBalance();
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
}

//setup
updateTransactions();
updateBalance();
updateSummary();

transactionBtn.addEventListener("click", () => {
  transactionSection.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  transactionSection.classList.remove("show");
});

resetBtn.addEventListener("click", () => {
  const confirmReset = confirm(
    "WARNING: This will clear all your previous transactions"
  );
  if (!confirmReset) return;
  transactions = [];
  randomAmount = 0;
  localStorage.setItem("transactions", JSON.stringify(transactions));
  localStorage.setItem("startingBalance", JSON.stringify(randomAmount));

  updateBalance();
  updateSummary();
  updateTransactions();
});
