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

// Set up variables
let income = 0;
let expenses = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let selectValue = selectInput.value;            // Select income OR expenses
  let descValue = descInput.value;                // Gets description
  let valueInputValue = Number(valueInput.value); // Gets amount entered
  if (selectValue === 'income' && isFinite(valueInputValue) && descValue !== '' && valueInputValue) {
    // Update income amount and main display
    income += valueInputValue;
    displayIncome.textContent = formatMoney(income);
    addReason(descValue, incomeUL, valueInputValue);
    totalAmount.textContent = formatTotal();
    clearInput();
  } else if (selectValue === 'expense' && isFinite(valueInputValue) && descValue !== '' && valueInputValue) {
    // Update expense amount and main display
    expenses += valueInputValue;
    displayExpenses.textContent = formatMoney(expenses);
    addReason(descValue, expensesUL, valueInputValue);
    totalAmount.textContent = formatTotal();
    clearInput();
  }
});

output.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    if (e.target.parentElement.parentElement.id === 'income-output') {

      // Update display
      const tempAmount = e.target.previousElementSibling.textContent;
      income -= tempAmount.slice(1, tempAmount[length - 1]);
      displayIncome.textContent = formatMoney(income);
      totalAmount.textContent = formatTotal();

      // Delete Item
      removeItem(e);

    } else if (e.target.parentElement.parentElement.id === 'expenses-output') {

      // Update display
      const tempAmount = e.target.previousElementSibling.textContent;
      expenses -= tempAmount.slice(1, tempAmount[length - 1]);
      displayExpenses.textContent = formatMoney(expenses);
      totalAmount.textContent = formatTotal();

      // Delete Item
      removeItem(e);
    }
  }
});

function formatTotal() {
  let total = income - expenses;
  return '£' + total.toFixed(2);
}

function formatMoney(type) {
  return '£' + type.toFixed(2);
}

function addReason(info, ul, money) {
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
}

function clearInput(desc, value) {
  descInput.value = '';
  valueInput.value = '';
}

function removeItem(event) {
  const ul = event.target.parentElement.parentElement;
  const li = event.target.parentElement;
  ul.removeChild(li);
}
