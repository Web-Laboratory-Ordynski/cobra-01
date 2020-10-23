// debugger

// getAllBreedsPromise()
// getBreedByStringPromise(breedQuery)

// + 1. Создать функцию для получения всех пород собак (возврощает промис)
// + 2.1 Создать функцию для получения породы собаки по строке (возврощает промис) https://api.thedogapi.com/v1/breeds/search?q=ala
// + 2.2 Создать функцию для получения картинки по id породы (возврощает промис)
// 3. Создать функцию для вывода списка пород
// 4. Создать функцию для вывода карточки с породой

function createListFromBreeds(breedsArray) {
  var firstSymbol = breedsArray[0].name;
  var count = 0;
  var fs = "";
  var stringDogsArray = [];
  let stringResult = "";
  const stringResultArr = [];
  //   let liResult = [];
  const groupBy = (key) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, []);

  var dogsFilter = breedsArray.filter((dog) => {
    if (dog.name[0] == firstSymbol) {
      count++;
      if (count <= 2) {
        dog.firstSymbol = firstSymbol;
        return dog;
      }
    } else {
      count = 1;
      firstSymbol = dog.name[0];
      dog.firstSymbol = firstSymbol;
      return dog;
    }
  });

  for (k of dogsFilter) {
    if (k.firstSymbol == fs) {
      stringDogsArray.push(k.name);
    } else {
      fs = k.firstSymbol;
      stringDogsArray.push(fs);
      stringDogsArray.push(k.name);
    }
  }

  const groupByFirstSymbol = groupBy("firstSymbol")(dogsFilter);

  for (const key in groupByFirstSymbol) {
    if (groupByFirstSymbol.hasOwnProperty(key)) {
      const elements = groupByFirstSymbol[key];
      stringResult = `${key}: `;

      elements.forEach((element, index) => {
        if (index == elements.length - 1) {
          stringResult = stringResult + element.name;
        } else {
          stringResult = stringResult + element.name + `, `;
        }
      });
      stringResultArr.push(stringResult);
    }
  }

  let ul = document.createElement("ul");
  const liResult = stringResultArr.forEach((element) => {
    li = document.createElement("li");
    li.innerText = element;
    ul.appendChild(li);
  });

  return ul; // новый елемент в котором уже создан список пород.
}

function createCardFromBreed(breed) {

    let div = document.createElement("div");
    const divResult = Object.entries(breed.breed).forEach(([key, value]) => {
      p = document.createElement("p");
      p.innerText = `${key}: ${typeof value != 'object' ? value: value.metric}`;
      div.appendChild(p);
    });
    let img = document.createElement("img"); 
    img.src = breed.img.url;
    div.appendChild(img);
  return div; // новый елемент в котором уже создана карточка с породой.
}

$(document).ready(() => {
  const listContainer = document.getElementById("dog__list");
  const cardContainer = document.getElementById("card-container");
  const searchBreedBtn = document.getElementById("js-btn-search");
  const userBreedInput = document.getElementById("js-input-search");

  getAllBreedsPromise().then((breedsArray) =>
    listContainer.appendChild(createListFromBreeds(breedsArray))
  );

  searchBreedBtn.addEventListener("click", (event) => {
    getBreedByStringPromise(userBreedInput.value)
      .then(breedInfo => cardContainer.appendChild(createCardFromBreed(breedInfo)))
      .then((show) => {
        document.getElementById("js-display-none").style.display = 'flex';
      });
  });
});


