const fs = require('fs');
const path = require("path");
const dbFilePath = path.join(__dirname, 'db.txt');
// Example data to save

// Convert data to a CSV (comma-separated values) format
// const csvData = dataToSave.map((entry) => `${entry.name},${entry.age}`).join('\n');
let dbTXT;

function readTXT(callback) {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading database:', err);
            return;
        }

        try {
            dbTXT = JSON.stringify(parseTxtToJson(data)); callback(dbTXT);
            // dbTXT = JSON.parse(data); callback(dbTXT);
            console.log('data::', data);
        } catch (parseError) { console.error('Error parsing JSON:', parseError); }
        // console.log('data::', dbJSON);

    });
    return dbTXT;
}

// MAIN //  readDbJSON->insertTxtDB()
// readTXT((database) => { insertTxtDB(database); return database;} );
readTXT((database) => {
    insertTxtDB(database); return database;
    // console.log('Fetched database:', database);
});

// Define the path to the text file
const filePath = 'sjon.txt';
// const filePath = ;

// console.log('jsonToTxt', readDbJSON());

const jsonToTxt = (json) => {
    const delimiter = ': ';
    const data = json.users;// ???

    let keyValueText =  '';
    // const keyValueText =  '[]';
    for (const obj of data) {
        keyValueText += Object.entries(obj)
            .map(([k, v]) => `${k}${delimiter}${v}`).join('\n') + '\n';
    }
    // for each k-v

    // count items in object // check similar quantity
    // get items-quantity only after comparing each nested objects.length
    let ChunkQtyItms =  Object.keys(data[0]).length;
    keyValueText = ChunkQtyItms + "\n" + keyValueText;
    // console.log('jsonToTxt----',  data);

    return keyValueText;
}

// function updateDB(database, callback) {
function insertTxtDB(database) {

    // check correct data - separate fn
    // let validData = compareQtyObjItems(database);// call (old)
        let validData = true;

    // console.log('validData', validData);
    if ( validData ) {
        // let txt = jsonToTxt(database);
        // Write txt-data to js-file
        let txt = database;

        fs.writeFile(filePath, txt,
            {encoding: "utf8", flag: "w", mode: 0o666},
            (err) => {
                if (err)
                    console.log(err);
                else {
                    // console.log("File written successfully\n");
                    console.log("The written has the following contents:");
                    // console.log(fs.readFileSync(filePath, "utf8"));
                }
            }
        );
    }
}

function compareQtyObjItems(arrObj){
    // Array.isArray(arrObj)
    // console.log('compare', arrObj);

    // check here or in up-level for each KEY: VALUE(ARR) / users: [], company: []
    // arrObj = [
    //   { id: 41, name: 'John', age: 22 },
    //   { id: 52, name: 'Tom', age: 21 },
    //   { id: 37, name: 'Bob', age: 33, h: 'po' }
    // ]; // provoke FALSE
    arrObj = arrObj.users; // +++

    let equal = false;

    for ( let i = 1; i < arrObj.length; i++ ) {
        if ( Object.keys(arrObj[i]).length  ===
            Object.keys(arrObj[i - 1]).length ) {
            equal = true;
            // break; // Зупинити перевірку, якщо знайдено незростаючу пару чисел
        } else {
            equal = false; break; // print error
        }
    }

    return equal;
}

function parseTxtToJson(txt){
    // console.log('parseTxtData', txt);

    // check valid txtdb (first el has typeof NUM)
    let arrTxtDb = txt.split("\n");

    // console.log('parseTxtData', arrTxtDb);
    let chumk =  parseInt(arrTxtDb.shift());

    let res = chunkArray(arrTxtDb, chumk);
    res.pop()

    let finArrObj =  res.map(i => { 
        return transformUglyArrayToObject(i)
    })
    // console.log('parseTxtData', finArrObj );

    return finArrObj

}

// helpers mod function
function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
}

// function arrayToObject(arr) {
function transformUglyArrayToObject(arr){
        const obj = {};
    
        for (const item of arr) {
            const [key, value] = item.split(': ');
            obj[key] = value;
        }
    
        return obj;
}
//   const inputArray = ['id: 41', 'name: John', 'age: 22'];
//   const resultObject = arrayToObject(inputArray);




function generateAndPushUniqueElements(qty, targetArray, generateFunction) {
    if (qty <= 0) {
      return; // Завершуємо рекурсію, коли досягнута задана кількість елементів
    }
    const newElement = generateFunction();
    // Перевіряємо, чи новий елемент є унікальним
    if (!targetArray.includes(newElement)) {
      targetArray.push(newElement);
      generateAndPushUniqueElements(qty - 1, targetArray, generateFunction); // Рекурсивно викликаємо функцію
    } else {
      // Якщо новий елемент не є унікальним, спробуємо знову
      generateAndPushUniqueElements(qty, targetArray, generateFunction);
    }
  }
  
  // Приклад використання:
  
//   const uniqueElementsArray = [];
//   const generateRandomNumber = () => Math.floor(Math.random() * 100); // Приклад функції генерації випадкових чисел
  
//   generateAndPushUniqueElements(5, uniqueElementsArray, generateRandomNumber);
//   console.log(uniqueElementsArray);
function splitArrayElements(array) {
    const result = [];
    
    for (let i = 0; i < array.length; i++) {
      const words = array[i].split(' ');
      result.push(...words);
    }
    
    return result;
  }
  
  // Приклад використання:
  const ukrainianNames = [
    'Ivan Petrov',
    'Maria Sidorova',
    'Vasyl Kovalenko',
    'Olena Lysenko',
    'Andrii Kozlov',
    'Nataliia Moroz',
    'Mykhailo Pavlenko',
    'Sofia Shevchenko',
    'Yurii Zaitsiv',
    'Tetiana Kravchenko',
    'Oleh Honchar',
    'Iryna Kuzmenko',
    'Serhii Boiko',
    'Anna Doroshenko',
    'Dmytro Hryhorenko',
    'Liudmyla Tkachenko',
    'Roman Savchenko',
    'Kateryna Levchenko',
    'Vitalii Rudenko',
    'Yevhen Melnyk',
    'Olha Fedorenko',
    'Pavlo Shevtsov',
    'Halyna Mazur',
    'Artem Korol',
    'Larysa Myronenko',
    'Ihor Shapoval',
    'Tetiana Polyakova',
    'Ruslan Serhiienko',
    'Alla Kotsiubynska',
    'Yaroslav Onopko',
    'Lidiia Bondarenko',
    'Volodymyr Frolov',
    'Nina Hrytsenko',
    'Andrii Panchenko',
    'Oksana Tereshchenko',
    'Anatolii Havryliuk',
    'Maryna Martynenko',
    'Serhii Lys',
    'Tamara Popova',
    'Vladyslav Bilous',
    'Liubov Kostenko',
    'Viktor Semenov',
    'Nina Bilenka',
    'Oleksii Riabokon',
    // Додайте інші імена та прізвища тут
  ];
  

  
  const outputArray = splitArrayElements(ukrainianNames);
  console.log(outputArray);
  function splitArrayElements(array) {
    const result = [];  
    for (let i = 0; i < array.length; i++) {
      const words = array[i].split(' ');
      result.push(...words);
    }
    return result;
  }