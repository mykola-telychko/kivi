const fs = require('fs');
const path = require("path");
// const {NAMES } = require('./config.js');

// BUILD DATA GENERATOR FOR FILL KEY-VALUE DB
const COUNTRY_CODE = {
            "US": 1, "Canada": 19,
            "United Kingdom": 44, 'Australia': 61,
            "Germany": 49, "France": 33, "Japan": 81,
            "Brazil": 55, "India": 91, "China": 86
}

// const NAMES =  ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia', 'James', 'Sophia',
// 'Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller', 'Davis', 'Garcia'];
const NAMES = [
    'Ivan',       'Petrov',     'Maria',        'Sidorova',   'Vasyl',
    'Kovalenko',  'Olena',      'Lysenko',      'Andrii',     'Kozlov',
    'Nataliia',   'Moroz',      'Mykhailo',     'Pavlenko',   'Sofia',
    'Shevchenko', 'Yurii',      'Zaitsiv',      'Tetiana',    'Kravchenko',
    'Oleh',       'Honchar',    'Iryna',        'Kuzmenko',   'Serhii',
    'Boiko',      'Anna',       'Doroshenko',   'Dmytro',     'Hryhorenko',
    'Liudmyla',   'Tkachenko',  'Roman',        'Savchenko',  'Kateryna',
    'Levchenko',  'Vitalii',    'Rudenko',      'Yevhen',     'Melnyk',
    'Olha',       'Fedorenko',  'Pavlo',        'Shevtsov',   'Halyna',
    'Mazur',      'Artem',      'Korol',        'Larysa',     'Myronenko',
    'Ihor',       'Shapoval',   'Tetiana',      'Polyakova',  'Ruslan',
    'Serhiienko', 'Alla',       'Kotsiubynska', 'Yaroslav',   'Onopko',
    'Lidiia',     'Bondarenko', 'Volodymyr',    'Frolov',     'Nina',
    'Hrytsenko',  'Andrii',     'Panchenko',    'Oksana',     'Tereshchenko',
    'Anatolii',   'Havryliuk',  'Maryna',       'Martynenko', 'Serhii',
    'Lys',        'Tamara',     'Popova',       'Vladyslav',  'Bilous',
    'Liubov',     'Kostenko',   'Viktor',       'Semenov',    'Nina',
    'Bilenka',    'Oleksii',    'Riabokon',
  'Hans', 'Müller', 'Anna', 'Schmidt',
  'Michael', 'Schneider', 'Maria', 'Fischer',
  'Thomas', 'Weber', 'Andrea', 'Meyer',
  'Martin', 'Wagner', 'Susanne', 'Becker',
  'Christian', 'Schulz',  'Ursula', 'Hoffmann',
  'Stefan', 'Schäfer', 'Petra', 'Koch', 'Sebastian', 'Bauer',
  'Monika', 'Richter', 'Markus', 'Klein',
  'Sabine', 'Wolf', 'Patrick', 'Neumann', 'Silke', 'Schwarz',
  'Alexander', 'Zimmermann', 'Kathrin', 'Braun', 'Daniel', 'Krüger',
  'Melanie', 'Hofmann', 'Jürgen', 'Schmitt', 'Barbara', 'Werner',
  'Tobias', 'Lange', 'Anja', 'Schmid',
  'Nico', 'Krause', 'Tanja', 'Vogel',
  'Oliver', 'Stein', 'Janine', 'Otto',
  'Max', 'Günther', 'Jasmin', 'Berger',
  'Sven', 'Arnold', 'Laura', 'Peters',
  'Florian', 'Huber', 'Nina', 'Walter',
  'Juan',      'Garcia',    'Maria',   'Rodriguez',
  'Manuel',    'Martinez',  'Laura',   'Fernandez',
  'Antonio',   'Lopez',     'Isabel',  'Sanchez',  
  'Francisco', 'Torres',    'Ana',     'Perez',    
  'David',     'Ramirez',   'Sofia',   'Gonzalez', 
  'Pedro',     'Diaz',      'Luisa',   'Romero',   
  'Miguel',    'Castro',    'Elena',   'Ruiz',     
  'Rafael',    'Hernandez', 'Carmen',  'Navarro',
  'Diego',     'Jimenez',   'Natalia', 'Morales',
  'Carlos',    'Ortega',    'Raquel',  'Vega',
  'Javier',    'Martin',    'Beatriz', 'Guerrero',
  'Jose',      'Morales',   'Adriana', 'Medina',
  'Roberto',   'Vargas',    'Lourdes', 'Leon',
  'Gabriel',   'Soto',      'Silvia',  'Rios',
  'John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia', 'James', 'Sophia',
  'Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller', 'Davis', 'Garcia',
  'Pablo',     'Castro',    'Marta',   'Navarro'
];

// const NAMES = cnf("NAMES");

const QTY = 500000; // max: 3 000 000 // optimal: 500000
const STORAGE = 'storage.txt';

function generateRanKit(length) {
    if (length <= 0)  throw new Error("Length must be greater than 0");
  
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandElFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function genRandNames(quantity, elements) {
    const randomStrings = []; const elementsCount = elements.length;
  
    for (let i = 0; i < quantity; i++) {
      let randomString = '';
      for (let j = 0; j < 3; j++) {
        const randomIndex = Math.floor(Math.random() * elementsCount);
        randomString += elements[randomIndex];
      }
      randomStrings.push(randomString);
    }
  
    return randomStrings;
}

function genTelNums( quantity) {
    const CODE = Object.values(COUNTRY_CODE);
    let finArr = [];

    for ( let i = 0; i < quantity; i++ ) {
         finArr.push('+' + getRandElFromArray(CODE) + generateRanKit(10));
    }
    return finArr;
}

function buildTable(keys, values){
    const tableData = [];
    for (let i = 0; i < Math.max(keys.length, values.length); i++) {
      tableData.push({ Column1: keys[i], Column2: values[i] });
    }
    return tableData;
}

let peoples = genRandNames( QTY, NAMES); 
let telnum = genTelNums( QTY);

  // console.table( buildTable(peoples, telnum) );

  // console.log(  JSON.stringify({nam, num})); // { nam:[], num:[] }
  // console.log( nam.length, nam, "\n",
  //                num.length, num );

  // функція для переливання з массива в массив на вказану кількість елементів 
  function moveElements(sourceArray, targetArray, count) {
    if (!Array.isArray(sourceArray) || !Array.isArray(targetArray) || count < 0) {
      throw new Error('Параметри некоректні');
    }
    const elementsToMove = sourceArray.slice(0, count); // Копіюємо елементи, а не видаляємо їх
    const newTargetArray = [...targetArray, ...elementsToMove]; // Створюємо новий масив, що включає переміщені елементи
    return newTargetArray;
  }

  function generateAndPushUniqueElements(qty, targetArray, spareMilElem) {
        // spareMilElem -> targetArray (Nu el)
        let Nu =  qty - targetArray.length;
        if ( Nu > 0 ) {
            let finArr = moveElements(spareMilElem, targetArray, Nu);
            // console.log( Nu, finArr );
            return finArr;
        } else {
            return targetArray;
        }
  }



  const millionUniqueNames = generateUniqueNamesArray(1000000);
  let unames = uniqueNameArray(peoples);
  let uNamArr =  generateAndPushUniqueElements(QTY , unames, millionUniqueNames);
    // console.log( appi ); 
  let dataForDb =  concatenateArraysAlternately(uNamArr, telnum).join('|');
  insertToDB(dataForDb); // write to db




function insertToDB(database) {

  let validData = true;
  // console.log('validData', validData);
  if ( validData ) {
      let txt = database;

      fs.writeFile(STORAGE, txt,
          {encoding: "utf8", flag: "w", mode: 0o666},
          (err) => {
              if (err) console.log(err);
              else {
                  console.log("The written has the following contents:");
              }
          }
      );
  }
}

// insertToDB(JSON.stringify({...nam, ...num}));

// HELPERS 
function uniqueNameArray(arr) {
  const uniqueArray = []; const seenValues = {};

  for (const value of arr) {
    if (!seenValues[value]) {
      uniqueArray.push(value);
      seenValues[value] = true;
    }
  }
  return uniqueArray;
}

///////
function generateRandomName() {
  const length = 6; // Довжина імені
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Символи, які можуть бути в імені
  let name = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    name += characters.charAt(randomIndex);
  }

  return name;
}

// use for custom hash fn
function generateUniqueNamesArray(count) {
  const uniqueNames = new Set();

  while (uniqueNames.size < count) {
    const name = generateRandomName();
    uniqueNames.add(name);
  }

  return Array.from(uniqueNames);
}

function concatenateArraysAlternately(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error('Масиви мають різну довжину');
  }

  const result = [];

  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i]);
    result.push(arr2[i]);
  }

  return result;
}



