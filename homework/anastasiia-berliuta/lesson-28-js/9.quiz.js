// Задать пользователю 3 вопроса, в каждом вопросе по 3 варианта ответа. 
// За каждый правильный ответ начисляется 2 балла. 
// После вопросов выведите пользователю количество набранных баллов.

function Quiz(firstQuestion, secondQuestion, thirdQuestion){
    if (firstQuestion == "нет"){
        firstQuestion = 2;
    } else {
        firstQuestion = 0;
    };
    if (secondQuestion == "небо"){
        secondQuestion = 2;
    } else {
        secondQuestion = 0;
    };
    if (thirdQuestion == "Белое"){
        thirdQuestion = 2;
    } else {
        thirdQuestion = 0;
    };
    var score = firstQuestion + secondQuestion + thirdQuestion;
    return score;
}
var firstQuestion = prompt("Земля плоская? Выбирите ответ: да, нет, на половину");
var secondQuestion = prompt("Продолжите песню: Что такое осень? Это - ... Выбирите ответ: небо, море, бобры");
var thirdQuestion = prompt("Какое море не омывает Украину? Выбирите ответ: Черное, Белое, Азовское ");

alert("Ваш результат = "+ Quiz(firstQuestion, secondQuestion, thirdQuestion) + ". Спасибо за потраченное время :)");

