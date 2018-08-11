

// Select display boxes
const displayIncome = document.getElementById('display-income');
const displayExpenses = document.getElementById('display-expenses');

// Select form controls
const form = document.getElementById('form-input');
const selectInput = document.getElementById('select-input');
const descInput = document.getElementById('desc-input');
const valueInput = document.getElementById('value-input');
const totalAmount = document.getElementById('total');

// Select ul
const output = document.getElementById('output');
const incomeUL = document.getElementById('income-output');
const expensesUL = document.getElementById('expenses-output');

// Used for local storage
let localList = [];

// Set up variables
let income = 0;
let expenses = 0;

//---------- Helper functions ----------//

function formatTotal() {
  let total = income - expenses;
  return '£' + total.toFixed(2);
}

function formatMoney(type) {
  return '£' + type.toFixed(2);
}

function clearInput() {
  descInput.value = '';
  valueInput.value = '';
}

//---------- User input ----------//
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let selectValue = selectInput.value;            // Select income OR expenses
  let descValue = descInput.value;                // Gets description
  let valueInputValue = Number(valueInput.value); // Gets amount entered
  if (selectValue === 'income' && isFinite(valueInputValue) && descValue !== '' && valueInputValue) {
    // Update income amount and main display
    income += valueInputValue;
    displayIncome.textContent = formatMoney(income);
    addReason("income", descValue, incomeUL, valueInputValue);
    totalAmount.textContent = formatTotal();
    clearInput();
  } else if (selectValue === 'expense' && isFinite(valueInputValue) && descValue !== '' && valueInputValue) {
    // Update expense amount and main display
    expenses += valueInputValue;
    displayExpenses.textContent = formatMoney(expenses);
    addReason("expense", descValue, expensesUL, valueInputValue);
    totalAmount.textContent = formatTotal();
    clearInput();
  }
});

//---------- Output/Entries ----------//

// Delete buttons
output.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    if (e.target.parentElement.parentElement.id === 'income-output') {

      // Update display
      const tempAmount = e.target.previousElementSibling.textContent;
      income -= tempAmount.slice(1, tempAmount[length - 1]);
      displayIncome.textContent = formatMoney(income);
      totalAmount.textContent = formatTotal();

      // Delete Item
      localRemove(e);
      removeItem(e);


    } else if (e.target.parentElement.parentElement.id === 'expenses-output') {

      // Update display
      const tempAmount = e.target.previousElementSibling.textContent;
      expenses -= tempAmount.slice(1, tempAmount[length - 1]);
      displayExpenses.textContent = formatMoney(expenses);
      totalAmount.textContent = formatTotal();

      // Delete Item
      localRemove(e);
      removeItem(e);

    }
  }
});

// Remove from screen
function removeItem(event) {
  const ul = event.target.parentElement.parentElement;
  const li = event.target.parentElement;
  ul.removeChild(li);
}

// Remove from local storage
function localRemove(event) {
  let entries = JSON.parse(localStorage.getItem('items'));
  let itemName = event.target.previousElementSibling.previousElementSibling;
  entries.forEach((item, i) => {
    if (item.info === itemName.textContent) {
      entries.splice(i, 1);
      localStorage.setItem('items', JSON.stringify(entries));
    }
  });
}

// Entries
function addReason(type, info, ul, money) {
  const li = document.createElement('li');
  const infoSpan = document.createElement('span');
  const moneySpan = document.createElement('span');
  const button = document.createElement('button');
  button.textContent = 'X';
  infoSpan.textContent = info;
  moneySpan.textContent = formatMoney(money);
  li.append(infoSpan);
  li.append(moneySpan);
  li.append(button);
  ul.append(li);
  localList.push({
    "type": type,
    "info": info,
    "value": formatMoney(money)
  });
  localStorage.setItem('items', JSON.stringify(localList));
}



//------------ Local Storage --------------//

let loadLocalStorage = localStorage.getItem('items');

// If local storage has been used display the values and update displays
if (loadLocalStorage) {
  localList = JSON.parse(localStorage.getItem('items')); // Stops overwriting local storage when adding new entries.
  getItems();
  displayIncome.textContent = formatMoney(income);
  displayExpenses.textContent = formatMoney(expenses);
  totalAmount.textContent = formatTotal();
} else {
  localList = [];
}

function getItems() {
  let items = JSON.parse(localStorage.getItem('items'));
  const incomeUL = document.getElementById('income-output');
  const expensesUL = document.getElementById('expenses-output');
  items.forEach(item => {
    const li = document.createElement('li');
    const infoSpan = document.createElement('span');
    const moneySpan = document.createElement('span');
    const button = document.createElement('button');
    button.textContent = 'X';
    infoSpan.textContent = item.info;
    moneySpan.textContent = item.value;
    li.append(infoSpan);
    li.append(moneySpan);
    li.append(button);

    if (item.type === 'income') {
      incomeUL.append(li);
      income += +item.value.slice(1, item.value[length - 1])
    } else if (item.type === 'expense') {
      expensesUL.append(li);
      expenses += +item.value.slice(1, item.value[length - 1]);
    }
  });
}