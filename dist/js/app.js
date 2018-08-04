// Select display boxes
const displayIncome = document.getElementById('display-income');
const displayExpenses = document.getElementById('display-expenses');

// Select form controls
const form = document.getElementById('form-input');
const selectInput = document.getElementById('select-input');
const valueInput = document.getElementById('value-input');
const totalAmount = document.getElementById('total');

// Set up variables
let income = 0;
let expenses = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let total;
  if (selectInput.value === 'income' && isFinite(valueInput.value)) {
    // Update income amount and main display
    income += Number(valueInput.value);
    displayIncome.textContent = formatIncomeAndExpenses(income);
    totalAmount.textContent = formatTotal();
  } else if (selectInput.value === 'expense' && isFinite(valueInput.value)) {
    // Update expense amount and main display
    expenses += Number(valueInput.value);
    displayExpenses.textContent = formatIncomeAndExpenses(expenses);
    totalAmount.textContent = formatTotal();
  }

  function formatIncomeAndExpenses(type) {
    return '£' + type.toFixed(2);
  }

  function formatTotal() {
    total = income - expenses;
    return '£' + total.toFixed(2);
  }
});

