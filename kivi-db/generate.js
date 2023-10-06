const fs = require('fs');
const path = require("path");
const config = require('./config.json');

// BUILD DATA GENERATOR FOR FILL KEY-VALUE DB
const COUNTRY_CODE = config.countryCode;
const NAMES = config.telNumbers;
const QTY = 1000000; // max: 3 000 000 // optimal: 500000
const STORAGE = 'storage.txt';
// console.log(config);
// node .\drawwork.js READ FROM Canada

function generateRanKit(length) {
    if (length <= 0)  throw new Error("Length must be greater than 0");
  
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

// build full telephone num 
function genTelNums(quantity) {
    const CODE = Object.values(COUNTRY_CODE);
    let finArr = [];

    for ( let i = 0; i < quantity; i++ ) {
         finArr.push('+' + getRandElFromArray(CODE) + generateRanKit(10));
    }
    return finArr;
}

function generateAndPushUniqueElements(qty, targetArray, spareMilElem) {
      // spareMilElem -> targetArray (Nu el)
      let insufficientNum =  qty - targetArray.length;
      if ( insufficientNum > 0 ) {
          let finArr = draggingElements(spareMilElem, targetArray, insufficientNum);
          return finArr;
      } else { return targetArray; }
}

function insertToDB(database) {
  let validData = true;
  if ( validData ) {
      let txt = database;

      fs.writeFile(STORAGE, txt, {encoding: "utf8", flag: "w", mode: 0o666},
          (err) => {
              if (err) console.log(err);
              else {
                  console.log("The written has the following contents:");
              }
          }
      );
  }
}

// constructor - start 
let peoples = genRandNames(QTY, NAMES); 
let telnum = genTelNums(QTY);

const millionUniqueNames = generateUniqueNamesArray(1000000);
let unames = uniqueNameArray(peoples);
let uNamArr =  generateAndPushUniqueElements(QTY , unames, millionUniqueNames);
  // console.log( appi ); 
let dataForDb =  concatenateArraysAlternately(uNamArr, telnum).join('|');
insertToDB(dataForDb); // write to db
// console.table( buildTable(peoples, telnum) );
// constructor - end 


// HELPERS -- START
function uniqueNameArray(arr) {
    const uniqueArray = []; const seenValues = {};

    for (const value of arr) {
        if (!seenValues[value]) {
          uniqueArray.push(value); seenValues[value] = true;
        }
    }
    return uniqueArray;
}

function generateRandomName() {
    const length = 8; // name len
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
    let name = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        name += characters.charAt(randomIndex);
    }
    return name;
}

function buildTable(keys, values){
    const tableData = [];
    for (let i = 0; i < Math.max(keys.length, values.length); i++) {
      tableData.push({ Column1: keys[i], Column2: values[i] });
    }
    return tableData;
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
    if (arr1.length !== arr2.length) throw new Error('diff arr len');
   
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      result.push(arr1[i]); result.push(arr2[i]);
    }
    return result;
}

// getting random element from array 
function getRandElFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// draggingElements from arr1 to arr2 - specified qty 
function draggingElements(sourceArray, targetArray, count) {
    if (!Array.isArray(sourceArray) || !Array.isArray(targetArray) || count < 0) {
      throw new Error('Параметри некоректні');
    }
    const elementsToMove = sourceArray.slice(0, count); // Копіюємо елементи, а не видаляємо їх
    const newTargetArray = [...targetArray, ...elementsToMove]; 
    return newTargetArray;
}
// HELPERS -- START



