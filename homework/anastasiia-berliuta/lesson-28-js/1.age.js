// Запросить у пользователя его возраст и определить, кем он является: ребенком (0–2), 
// подростком (12–18), взрослым (18_60) или пенсионером (60– ...).

function getAgeCategoryByNumber(age) {
    var ageCategory;
    if (age < 0) {
      ageCategory = 'Error';
    } else if (age < 13) {
      ageCategory = 'Ребенок';
    } else if (age < 19) {
      ageCategory = 'Подросток';
    } else if (age < 61) {
      ageCategory = 'Взрослый';
    } else {
      ageCategory = 'Пенсионер';
    }
  
    return ageCategory;
  }
  
  var args = process.argv;
  var userAge = args[2];
  userAge = Number(userAge);
  
  console.log('Введено: ', userAge);
  console.log('---------------');
  var ageCategoryString = getAgeCategoryByNumber(userAge);
  console.log('Вы: ', ageCategoryString);