// Запросить у пользователя пятиразрядное число и определить, является ли оно палиндромом.

function isItPal(userInput) {
    var result = "------please enter any number from 10000 to 99999------";
    if (userInput.length == 5) {
      if (isNaN(Number(userInput))) {
        result = "------it is not a number :(------";
      } else {
        Array.from(userInput);
        var a = userInput[0];
        var b = userInput[1];
        var c = userInput[2];
        var d = userInput[3];
        var e = userInput[4];
        if (a == e && b == d){
            result = console.log("------There is a palindrom :)------")
        } else 
        result = console.log("------There is not a palindrom :(------")
    }
      return result;
    } 
    } 

  
  var args = process.argv;
  var userInput = args[2];
  console.log(isItPal(userInput));