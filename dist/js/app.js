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

const incomeUL = document.getElementById('income-output');
const expensesUL = document.getElementById('expenses-output');

// Set up variables
let income = 0;
let expenses = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let selectValue = selectInput.value;    // Selects income OR expenses
  let descValue = descInput.value;        // Selects description
  let valueInputValue = Number(valueInput.value); // Selects amount entered
  console.log(valueInputValue);
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

  function formatMoney(type) {
    return '£' + type.toFixed(2);
  }

  function formatTotal() {
    let total = income - expenses;
    return '£' + total.toFixed(2);
  }

  function addReason(info, ul, money) {
    const li = document.createElement('li');
    const infoSpan = document.createElement('span');
    const moneySpan = document.createElement('span');
    infoSpan.textContent = info;
    moneySpan.textContent = formatMoney(money);
    li.append(infoSpan);
    li.append(moneySpan);
    ul.append(li);
  }

  function clearInput(desc, value) {
    descInput.value = '';
    valueInput.value = '';
  }

});

