// Запросить у пользователя число от 0 до 9
//  и вывести ему спецсимвол, который расположен на этой клавише (1–!, 2–@, 3–# и т. д).

function symbols(userInput) {
    var result = "please enter any number from 0 to 9 :(";
    if (userInput.length == 1) {
      if (isNaN(Number(userInput))) {
        result = "it is not a number :(";
      } else {
        var symbol;
        userInput = Number(userInput);
    if ( userInput == 0) {
      symbol = ')';
    } else if ( userInput === 1) {
      symbol = '!';
    } else if ( userInput === 2) {
      symbol = '@';
    } else if ( userInput === 3) {
      symbol = '#';
    } else if ( userInput === 4) {
        symbol = '$';
    } else if ( userInput === 5) {
        symbol = '%';
    } else if ( userInput === 6) {
        symbol = '^';
    } else if ( userInput === 7) {
        symbol = '&';
    } else if ( userInput === 8) {
        symbol = '*';
    } else if ( userInput === 9) {
        symbol = '(';
    }
      result = symbol;
    }
      return result;
    } else 
        return result;
    } 

  
  var args = process.argv;
  var userInput = args[2];
  console.log("You entered: (" + (userInput) + ") and your result is: " +  symbols(userInput) + ". Thank you:)");