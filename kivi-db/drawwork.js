#!/usr/bin/env node
const fs = require('fs');
const path = require("path");
const dbFilePath = path.join(__dirname, 'storage.txt');

const config = require('./config.json');
// const { log } = require('console');
const COUNTRY_CODE = config.countryCode;
const STORAGE_UPDATE = 'upstorage.txt';
const STORAGE_MAIN_PIPE = 'storage.txt';

// Check if at least one command-line argument is provided
if (process.argv.length < 3) {
  console.error('node cli_example.js <message>');
  process.exit(1); // Exit the script with a non-zero status code to indicate an error
}

// Access the command-line argument at index 2 (index 0 and 1 are reserved for node and script name)
const message1 = process.argv[2];
const message2 = process.argv[3];
const message3 = process.argv[4];
// remove first two elms 
const [, , ... queryArray ] = process.argv;

let dbTXT;

// console.log('KV:', message1, message2, message3);
// console.log('KV:', queryArray);
// handeQuery(queryArray);

// get region telephone num 
function handeQuery(query, allItems){

  switch (query[0]) {
    case "READ":
      //  readDbJSON((database) => {  return database;} );
      let code = COUNTRY_CODE[capitalizeFirstLetter(query[query.length - 1])];
      // get country code NUM on countryName 
      const matchingElements = selectOnCountry(allItems, code);
      return matchingElements;
      // read from db 

      break;
    case "CREATE":
      console.log("It's Tuesday.");
      break;
    case "DELETE":
      const ma = findRemove(allItems, query[1]);

      break;
    case "UPDATE":
      console.log("It's almost the weekend!");
      break;
    default:
      console.error("Error!");
  }
}
// node .\drawwork.js SELECT FROM 'canada'
// function insertToDB(database) {
function updateToDB(database, db) {
  let validData = true;
  if ( validData ) {
      let txt = database;
      fs.writeFile(db, txt, {encoding: "utf8", flag: "w", mode: 0o666},
          (err) => {
              if (err) console.log(err);
              else { console.log("update!"); }
          }
      );
  }
}

function readDbJSON(callback) {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
       if (err) {
           console.error('Error reading database:', err);
           return;
       }

       try {
          //  dbJSON = JSON.parse(data); callback(dbJSON);

          // https://github.com/mykola-telychko/assistant-js
           obj3Level = parseTxt(data); 

           let u = 'PetraDiazKotsiubynska';
          // let usrItem = selectName(u, 'value', dbTXT);
          let usrItem = selectName(u, 'key', obj3Level.main);

          // regexp for detected name or number -updateObjectItem
          // updateObjectItem(dbTXT, Object.keys(usrItem)[0], 'zelupa');
          // updateObjectItem(kv, dbTXT, '+914763000853', '+914763111853');
          // updateObjectItem('changeTelOnName', dbTXT, u, '+914311111113');
// get only REGION nums 
// All-data -> apply query -> result obj 
console.log('simpleSelectRegion::', handeQuery(queryArray, obj3Level));
// handeQuery(queryArray, obj3Level)

          callback(dbTXT);// get variable outer ,
          //  console.log('txt::', dbTXT);
       } catch (parseError) { console.error('Error parsing JSON:', parseError); }
  });
   return dbTXT;
}
// readDbJSON((database) => { insertTxtDB(database); return database;} );
// readDbJSON((database) => { console.log(database); return database;} );
// readDbJSON((database) => { return database;} ); // +++
let mod;
     mod = 'select';
if ( mod == 'select' ) {
  readDbJSON((database) => {  return database;} );

}


// txt -> obj //
function parseTxt(txt) {
    let arr = txt.split("|");
    const [evenArr, oddArr] = explodeArray(arr);
    // console.log( handeQuery(queryArray, oddArr));

    let objUsrTeleph = buildObjfromArrays(evenArr, oddArr);
    return {main: objUsrTeleph, usr: evenArr, tel: oddArr};// finally obj 
}

function explodeArray(srcArr) {
      const evenArr = [];
      const oddArr = [];

      for (let i = 0; i < srcArr.length; i++) {
        if (i % 2 === 0) {
          evenArr.push(srcArr[i]);
        } else {
          oddArr.push(srcArr[i]);
        }
      }
      return [evenArr, oddArr];
}



// HELPERS 
function deletePropertyByValue(obj, targetValue) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === targetValue) {
      delete obj[key];
    }
  }
  return obj;
}
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function buildTable(keys, values){
  const tableData = [];
  for (let i = 0; i < Math.max(keys.length, values.length); i++) {
    tableData.push({ Column1: keys[i], Column2: values[i] });
  }
  return tableData;
}
function buildObjfromArrays(keys, values){
  return  keys.reduce((acc, key, index) => {
    acc[key] = values[index];
    return acc;
  }, {});
}
function getKeysByValue(obj, targetValue) {
  const keys = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === targetValue) {
      keys.push(key);
    }
  }
  return keys;
}
function filterObjectByValuePrefix(obj, prefix) {
  const filteredObj = {};
  for (const key in obj) {
    if(prefix !== '+1'){
            if ( obj.hasOwnProperty(key) && 
                obj[key].startsWith(prefix) ) {
                filteredObj[key] = obj[key];
            }
    } else {
            if ( obj.hasOwnProperty(key) && 
            obj[key].startsWith(prefix) && obj[key].length == 12 ) {
            filteredObj[key] = obj[key];
            }
    }
  }
  return filteredObj;
}
function objectToStringPipe(obj) {
  let result = "";
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result += key + "|" + obj[key] + "|";
    }
  }
  // Remove the trailing "|"
  result = result.slice(0, -1);
  return result;
}

// QUERIES LIST 
function selectName(item, kv, object){
  // console.log('selectName::', item, kv, object);
  let obj = object;
  const result = {};

  if ( kv == 'key' ) {
    for ( const key in obj ) {
      if (key === item) { result[key] = obj[key]; }
    }
  } 
  else if ( kv == 'value' ) {
    for ( const key in obj ) {
      if (obj[key] === item) { result[key] = obj[key]; }
    }
  }
  if ( Object.keys(result).length > 0 ) {
        let item;
        if ( kv == 'key' ) {
            item = Object.keys(result)[0];
        } else if ( kv == 'value' ) {
            item = Object.values(result)[0];
        }
  }
  // console.table(buildTable(Object.keys(result),
  //                          Object.values(result)));
  return result;
}

function selectOnCountry(telNumsArr, codeCountry){
  let telNums;
  let prefix = "+" + codeCountry;
  telNums = filterObjectByValuePrefix(telNumsArr.main, prefix);

  return telNums;
}

function findRemove(allItem, itm) {
  // console.log("del.", allItem.main);
  let names = Object.keys(allItem.main);
  let tels = allItem.tel;
  let all = allItem.main;
  let pipeData; 
  if ( names.includes(itm) ) {
    
    delete all[itm];
     pipeData = objectToStringPipe(all);
    // join to update fns to one --
    updateToDB(JSON.stringify(all), STORAGE_UPDATE);
    updateToDB(pipeData, STORAGE_MAIN_PIPE);

  } else if (tels.includes(itm)) {
      console.log('tel elem', tels, itm)

    all = deletePropertyByValue(all, itm);
    pipeData = objectToStringPipe(all);
    // join to update fns to one --
    updateToDB(JSON.stringify(all), STORAGE_UPDATE);
    updateToDB(pipeData, STORAGE_MAIN_PIPE);

  } else { console.log('no elem')}

  // read // find // remove // write-update 

}


function updateObjectItem(kvMod, obj, targetKeyOrValue, newValue) {
  // console.log(obj, targetKeyOrValue, newValue);
 if ( kvMod == 'changeTelOnName' ) {
    for (const key in obj) {
      if (key === targetKeyOrValue || obj[key] === targetKeyOrValue) {
        obj[key] = newValue; 
      }
    }
 } else {console.log('error kvMod');}

  console.log(newValue);

  updateToDB(JSON.stringify(obj), STORAGE_UPDATE);
  return obj;
}