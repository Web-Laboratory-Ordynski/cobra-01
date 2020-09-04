// Написать конвертор валют. Пользователь вводит количество USD, 
// выбирает, в какую валюту хочет перевести EUR, UAN или AZN, и получает в ответ соответствующую сумму.

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your sum ? ", function(sum) {
    rl.question("Choose currency to convert: EUR, UAH, AZN: ", function(currency) {
        if (currency == "EUR"){
            var newSum = Number(sum)*0.84;
        } else if (currency == "UAH"){
             newSum = Number(sum)*27.49;
        } else if (currency == "AZN"){
            newSum = Number(sum)*1.70;
       } else {
        result = console.log("please choose your currency")
       }
        console.log(`You have ${sum} USD, it is ${newSum} ${currency}`);
        rl.close();
    });
});

rl.on("close", function() {
    process.exit(0);
});