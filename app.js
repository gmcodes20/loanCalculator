


// Listen f0r the submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hide result
  document.getElementById('results').style.display = 'none';

  //Show loader
  document.querySelector('.loading').style.display = 'block';

  setTimeout(calculateResult, 2000);

  e.preventDefault();
});

//Calculate Results
function calculateResult() {
  console.log('calculating...')
  // UI Variable
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');


  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // compute monthly payment 
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2)
    // show result
    document.getElementById('results').style.display = 'block';

    //hide loader
    document.querySelector('.loading').style.display = 'none';
  } else {

    showError('Please check your numbers')

  }


}

// show error function
function showError(error) {
  // Hide result
  document.getElementById('results').style.display = 'none';

  //hide loader
  document.querySelector('.loading').style.display = 'none';

  // create a div.
  const errorDiv = document.createElement('div');

  // Get some elements from the UI
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = ('alert alert-danger');
  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds

  setTimeout(clearError, 3000)

}

function clearError() {
  document.querySelector('.alert').remove();
}

document.getElementById('clear').addEventListener('click', clear);

function clear(e) {
  amount.value = '';
  interest.value = '';
  years.value = "";
  // Hide result
  document.getElementById('results').style.display = 'none';

  //hide loader
  document.querySelector('.loading').style.display = 'none';
  e.preventDefault()
}

