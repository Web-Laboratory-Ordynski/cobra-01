// Написать функцию, которая принимает 2 числа и возвращает 
// -1, если первое меньше, чем второе; 
// 1 – если первое больше, чем второе; 
// и 0 – если числа равны.

function checkTheEquality(a,b){
    var checkedEquality;
    if(a>b){
        checkedEquality = console.log("1"+" "+"первое больше, чем второе");
    } else if(a<b){
        checkedEquality = console.log("-1"+" "+"первое меньше, чем второе");
    } else {
        checkedEquality = console.log("0"+" "+"числа равны");
    }
    return checkedEquality;
}
checkTheEquality(5,7);



// Написать функцию, которая принимает три отдельные цифры и превращает их в одно число.
// Например: цифры 1, 4, 9 превратятся в число 149.

function getBiggerNumber(a,b,c){
    var bigNumber = [a,b,c];
    console.log(bigNumber.join(''));
}
getBiggerNumber(1,4,9);



// Написать функцию, которая принимает время (часы, минуты, секунды)
// и выводит его на экран в формате «чч:мм:сс».
// Если при вызове функции минуты и/или секунды не были переданы, то выводить их как 00.

function timeAlert(a,b,c){
    if (arguments.length == 2){
        c="00";
    } else if(arguments.length == 1){
        b="00";
        c="00";
    } else if(arguments.length == 0){
        a="00";
        b="00";
        c="00";
    }
    console.log(a+":"+b+":"+c);
}
timeAlert(12,15,23);