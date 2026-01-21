// ===== Global Variables =====
let testCase = 0;
let sumSales = 0;
let sumCommission = 0;
let logEntries = "";

// ===== Element References =====
const empNameEl = document.getElementById("empName");
const empIDEl = document.getElementById("empID");
const locksEl = document.getElementById("locks");
const stocksEl = document.getElementById("stocks");
const barrelsEl = document.getElementById("barrels");

const resultTable = document.getElementById("resultTable");
const caseCell = document.getElementById("caseCell");
const salesCell = document.getElementById("salesCell");
const commissionCell = document.getElementById("commissionCell");

const totalsBox = document.getElementById("totalsBox");
const totalSalesText = document.getElementById("totalSalesText");
const totalCommissionText = document.getElementById("totalCommissionText");

const logBox = document.getElementById("logBox");

// ===== Utility Functions =====
function clearErrors() {
  document
    .querySelectorAll("input")
    .forEach((el) => el.classList.remove("error-input"));
}

function validateInput(empName, empID, locks, stocks, barrels) {
  let error = false;

  const markError = (el) => {
    el.classList.add("error-input");
    error = true;
  };

  function isInvalid(value, min, max) {
    return value === '' || isNaN(value) || value < min || value > max;
}

  if (!empName) markError(empNameEl);
  if (!(empID, 100000, 999999)) markError(empIDEl);
  if (isInvalid(locks, 1, 70)) markError(locksEl);
  if (isInvalid(stocks, 1, 80)) markError(stocksEl);
  if (isInvalid(barrels, 1, 90)) markError(barrelsEl);

  return !error;
}

function calculateSales(locks, stocks, barrels) {
  return locks * 45 + stocks * 30 + barrels * 25;
}

function calculateCommission(sales) {
  let commission = 0;

  if (sales <= 1000) {
    commission = sales * 0.1;
  } else if (sales <= 1800) {
    commission = 1000 * 0.1 + (sales - 1000) * 0.15;
  } else {
    commission = 1000 * 0.1 + 800 * 0.15 + (sales - 1800) * 0.2;
  }

  return commission;
}

// ===== Main Function =====
function calculate() {
  clearErrors();

  const empName = empNameEl.value.trim();
  const empID = empIDEl.value.trim();
  const locks = parseInt(locksEl.value);
  const stocks = parseInt(stocksEl.value);
  const barrels = parseInt(barrelsEl.value);

  const isValid = validateInput(empName, empID, locks, stocks, barrels);

  resultTable.style.display = "table";

  if (!isValid) {
    caseCell.innerText = "---";
    salesCell.innerText = "---";
    commissionCell.innerText = "---";
  } else {
    testCase++;

    const sales = calculateSales(locks, stocks, barrels);
    const commission = calculateCommission(sales);

    caseCell.innerText = `Test Case #${testCase}`;
    salesCell.innerText = sales.toFixed(2);
    commissionCell.innerText = commission.toFixed(2);

    sumSales += sales;
    sumCommission += commission;

    totalsBox.style.display = "block";
    totalSalesText.innerText = sumSales.toFixed(2);
    totalCommissionText.innerText = sumCommission.toFixed(2);

    logEntries =
      `<b>Test Case #${testCase}</b><br>
         Name: ${empName} | ID: ${empID}<br>
         Locks: ${locks}, Stocks: ${stocks}, Barrels: ${barrels}<br>
         Sales: ${sales.toFixed(2)} | Commission: ${commission.toFixed(2)}
         <hr>` + logEntries;
  }

  logBox.style.display = "block";
  logBox.innerHTML = logEntries;
}

function resetForm() {
  clearErrors();
  document.querySelectorAll("input").forEach((el) => (el.value = ""));
  resultTable.style.display = "none";
  totalsBox.style.display = "none";
}
