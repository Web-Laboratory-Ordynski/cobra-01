// Запросить дату (день, месяц, год) и вывести следующую за ней дату. 
// Учтите возможность перехода на следующий месяц, год, а также високосный год.


// для браузера

// let userInput = prompt("Put your date");

// let userDate = new Date(userInput);

// userDate.setDate(userDate.getDate() + 1);

// var nextUserDate = userDate;

// alert("your date is " + userInput + " and the next date is " + userDate);

let args = process.argv;
let userInput = args[2]; 

let userDate = new Date(userInput);

userDate.setDate(userDate.getDate() + 1);

var nextUserDate = userDate;

console.log("your date is " + userInput + " and the next date is " + userDate);

//почему то определяет месяца не с нуля