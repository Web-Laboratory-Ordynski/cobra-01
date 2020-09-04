// Запросить у пользователя сумму покупки и вывести сумму к оплате со скидкой:
//  от 200 до 300 – скидка будет 3%, от 300 до 500 – 5%, от 500 и выше – 7%.

var args = process.argv;
var userSum = args[2];

function whatIsDiscount (userSum){
    if (userSum <= 199){
        result = console.log("no discount sorry")
    } else if (userSum <= 300) {
        userSum = userSum-(userSum*0.03);
        result = console.log("your sum with 3% discount is: " + userSum)
    }else if (userSum <= 500) {
        userSum = userSum-(userSum*0.05);
        result = console.log("your sum with 5% discount is: " + userSum)
    } else {
        userSum = userSum-(userSum*0.07);
        result = console.log("your sum with 7% discount is: " + userSum)
    }
    return result
}

console.log(whatIsDiscount (userSum));
