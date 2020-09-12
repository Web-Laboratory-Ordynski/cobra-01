// Определить количество цифр в введенном числе.

//#1
var args = process.argv;
var userNumber = args[2].split('');

console.log("в вашем числе столько цифр: " + userNumber.length);

//(classwork)

function numCounter(input_number){
    var numberOfDigits = 0;
    var tempNumber = input_number;

    while(tempNumber >= 1){
        numberOfDigits++;
        tempNumber = tempNumber / 10;
    }
    return numberOfDigits;
}

var result = numCounter(15641645416816418);
console.log(result);