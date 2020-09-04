// Запросить у пользователя трехзначное число и проверить, есть ли в нем одинаковые цифры.

function isThreeNumber(userInput) {
    var result = "please enter any number from 100 to 999";
    if (userInput.length == 3) {
      if (isNaN(Number(userInput))) {
        result = "it is not a number :(";
      } else {
        Array.from(userInput);
        var a = userInput[0];
        var b = userInput[1];
        var c = userInput[2];
        if (a == b || a == c || b == c){
            result = console.log("There are same numbers :)")
        } else 
        result = console.log("There are no same numbers :(")
    }
      return result;
    } else 
        return result;
    } 

  
  var args = process.argv;
  var userInput = args[2];
  console.log(isThreeNumber(userInput));