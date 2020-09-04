// Запросить у пользователя год и проверить, високосный он или нет. 
// Високосный год либо кратен 400, либо кратен 4 и при этом не кратен 100.

function isInteger(num) {
  return (num ^ 0) === num; 
  }

function ifItIsLeapyear(yourYear) {
    var result = "введите любой год на проверку";
      if (isNaN(Number(yourYear))) {
        result = "НЕ ЧИСЛО :(";
      }  else {
        var firstCheck = yourYear/1e2;
        firstCheck = isInteger(firstCheck);
          if(yourYear !== 400 && firstCheck === true){
            result = "It is a simple decade";
        } else {
          var secondCheck = yourYear/4;
          secondCheck = isInteger(secondCheck);
          var thirdCheck = yourYear/4e2;
          thirdCheck = isInteger(thirdCheck);
            if(secondCheck == true || thirdCheck == true){
            result = "Yes, it is a leap year!";
          } else {
            result = "It is a simple year";
          }
        }
       }
      return result;
      }
   
  var args = process.argv;
  var yourYear = Number(args[2]);
  console.log(ifItIsLeapyear(yourYear));