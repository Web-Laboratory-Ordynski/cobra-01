
// РЕАЛИЗОВАТЬ ФУНКЦИЮ-СЧЕТЧИК С ИСПОЛЬЗОВАНИЕМ ЗАМЫКАНИЯ. 


function sumCounter(firstNumber, secondNumber){
    function sumOfYourNumbers() {
        return firstNumber + secondNumber;
    };
    return sumOfYourNumbers;
}

var yourNumbers = sumCounter(5,2);
yourNumbers();
