// Запросить у пользователя длину окружности и периметр квадрата. 
// Определить, может ли такая окружность поместиться в указанный квадрат.

function ifCircleInscribed(lengthOfCircle, perimeterOfSquare) {
    var result = "------введите длину окружности и периметр квадрата------";
      if (isNaN(Number(lengthOfCircle)) || isNaN(Number(perimeterOfSquare))) {
        result = "------НЕ ЧИСЛО :(------";
      } else {
        var raduiusOfCircle = lengthOfCircle/(2*3.14);
        var squareSide = perimeterOfSquare/4;
          if (raduiusOfCircle === squareSide/2){
            result = "такую окружность МОЖНО вписать в квадрат";
          } else
          result = "такую окружность НЕЛЬЗЯ вписать в квадрат";
      }
      return result
    }

    var args = process.argv;
    var lengthOfCircle = args[2];
    var perimeterOfSquare = args[3];
    console.log(ifCircleInscribed(lengthOfCircle, perimeterOfSquare));
    // например сработает 25.12 и 32



