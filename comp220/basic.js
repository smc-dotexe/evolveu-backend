document.getElementById('btn').addEventListener('click', function() {
  var text;
  text = document.getElementById('input').value;
  console.log(Number(text) + 1);

  console.log('I\’m in the button click event');
});



/**********************************************
MY CALCULATOR
*********************************************/
  let firstNum, secondNum, result, add, subtract, mutliply, divide;
  result = document.getElementById('calcResult');
  firstNum = document.getElementById('num1');
  secondNum = document.getElementById('num2');
  add = document.querySelector('#add');
  subtract = document.querySelector('#subtract');
  multiply = document.querySelector('#multiply');
  divide = document.querySelector('#divide');

function calcFunction() {
  let x, a, b, resultText;
   x = event.target.id;
   a = Number(firstNum.value);
   b = Number(secondNum.value);

  switch(x) {
    case 'add':
        result.textContent = a + b;
        break;
    case 'subtract':
        result.textContent = a - b;
        break;
    case 'multiply':
        result.textContent = a * b;
        break;
    case 'divide':
        result.textContent = (a / b).toFixed(2);
  }
}

  add.addEventListener('click', calcFunction);

  subtract.addEventListener('click', calcFunction);

  multiply.addEventListener('click', calcFunction);

  divide.addEventListener('click', calcFunction);


/*************************************************
CANADIAN TAXES
*****************************************/

let  calcResult, effTax, userValue;
//Tax Brackets
const b1 = 47630;
const b2 = 95259;
const b3 = 147667;
const b4 = 210371;
//DOM
const userInput = document.getElementById('taxInput');
const inputSubmit = document.getElementById('submitBtn');
const greenbox = document.getElementById('taxResult');
const bluebox = document.getElementById('effectiveTax');



inputSubmit.addEventListener('click', taxFunction);

  function taxFunction() {
        userValue = userInput.value;

      //Bracket 1
        if (userValue < b1) {

              calcResult = userValue * 0.15;
              effTax = calcResult/ userValue * 100;
              greenbox.textContent ='$' + calcResult.toFixed(2);
              bluebox.textContent = effTax.toFixed(0) + '%';

        //Bracket 2
        } else if (userValue >= b1 && userValue < b2) {

              calcResult = (userValue - b1) * 0.205 + 7145;
              effTax = calcResult / userValue * 100;
              greenbox.textContent = '$' + calcResult.toFixed(2);
              bluebox.textContent = effTax.toFixed(0) + '%';

        //Bracket 3
        } else if (userValue >= b2 && userValue < b3) {

              calcResult = (userValue - b2) * 0.26 + 16908;
              effTax = calcResult / userValue * 100;
              greenbox.textContent = '$' + calcResult.toFixed(2);
              bluebox.textContent = effTax.toFixed(0) + '%';

        //Bracket 4
        } else if (userValue >= b3 && userValue <= b4) {

              calcResult = (userValue - b3) * 0.29 + 30535;
              effTax = calcResult / userValue * 100;
              greenbox.textContent = '$' + calcResult.toFixed(2);
              bluebox.textContent = effTax.toFixed(0) + '%';

        //Bracket 5
          } else {

              calcResult = (userValue - b4) * 0.33 + 48719;
              effTax = calcResult / userValue * 100;
              greenbox.textContent = '$' + calcResult.toFixed(2);
              bluebox.textContent = effTax.toFixed(0) + '%';
        }
}

/*************************************************
WORKING WITH ARRAYS
*****************************************/

  let arrInput, arrAddBtn, arrShowBtn,
    arrTotalBtn, arrClearBtn, emptyArr
  var testInput;

  arrInput = document.getElementById('arrayText');
  arrAddBtn = document.getElementById('arrayAddBtn');
  arrShowBtn = document.getElementById('arrayShowBtn');
  arrTotalBtn = document.getElementById('arrayTotalBtn');
  arrClearBtn = document.getElementById('arrayClearBtn');
  messageArr = document.getElementById('messageArray');

  emptyArr = [];

//Add Button Event
  arrAddBtn.addEventListener('click', function() {

      testInput = Number(arrInput.value);

        if (isNaN(testInput)) {
            messageArr.textContent = 'Please enter a number';
        } else {
            emptyArr.push(testInput);
            messageArr.textContent = "Number has been added";
        }

  });

//Show Array Button
  arrShowBtn.addEventListener('click', function() {

        messageArr.textContent = 'Current Array: ' + emptyArr;

  });

//Total Array Button
  arrTotalBtn.addEventListener('click', function() {

        total = 0;
        for (var i in emptyArr) {
          total += emptyArr[i];
        }
        messageArr.textContent = 'The sum of the array is: ' + total;

  });

//Clear Array Button
  arrClearBtn.addEventListener('click', function() {

        emptyArr = [];
        messageArr.textContent = 'The array has been cleared';

  });

  /*************************************************
  WORKING WITH DICTIONARIES
  *****************************************/

  let dictionInput, searchBtn, definition, descriptor;

    dictionInput = document.getElementById('arrayDiction');
    searchBtn = document.getElementById('submitDiction');
    definition = document.getElementById('lookupResult');

    const provinceObj = {
      ab: 'Alberta',
      bc: 'British Columbia',
      mb: 'Manitoba',
      nb: 'New Brunswick',
      nt: 'Newfoundland and Labrador',
      ns: 'Nova Scotia',
      nu: 'Nunavut',
      on: 'Ontario',
      pe: 'Prince Edward Island',
      qc: 'Quebec',
      sk: 'Saskatchewan',
      yt: 'Yukon',
    };

//Search Button Click Event
    searchBtn.addEventListener('click', function() {

        descriptor;
        userRequest = dictionInput.value;

          if (provinceObj.hasOwnProperty(userRequest) === true) {
              descriptor = Object.getOwnPropertyDescriptor(provinceObj, userRequest);
              definition.textContent = descriptor.value;
          } else {
              definition.textContent = 'Sorry. Couldn\'t find the province';
          }
});
