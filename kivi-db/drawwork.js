#!/usr/bin/env node
const fs = require('fs');
const path = require("path");
const dbFilePath = path.join(__dirname, '/store/storage.txt');

const config = require('./config.json');
// const { log } = require('console');
const COUNTRY_CODE = config.countryCode;
const STORAGE_UPDATE = path.join(__dirname, '/store/upstorage.txt');
const STORAGE_MAIN_PIPE = path.join(__dirname, '/store/storage.txt');

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

    // case "CREATE":
    case "ADD":
      query.shift();
      addUser(allItems, query);
      break;

    case "DELETE":
      // validate query here or upper 
      const delRes = findRemove(allItems, query[1]);
      break;

    case "UPDATE":
      // console.log("It's UPDATE!", allItems, query[1]);
      let arrParam = parseQuery(query, 'UPDATE');
      let arrUpdateArgs = parseQuery(arrParam, 'SET');

      findRemove(allItems, arrUpdateArgs[0])
      // if remove succes else : add new usr and num
      arrUpdateArgs.shift();
      addUser(allItems, query);
      // console.log("It's UPDATE!",  arrUpdateArgs[0]);

      break;

    default:
      console.error("Error!");
  }
}
// node .\drawwork.js SELECT FROM 'canada'
// function insertToDB(database) {
function updateToDB(database, db, action) {
  let validData = true;
  if ( validData ) {
      let txt = database;
      fs.writeFile(db, txt, {encoding: "utf8", flag: "w", mode: 0o666},
          (err) => {
              if (err) console.log(err);
              else { console.log("update! ", action); }
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



// HELPERS -- start 
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
function addNewUsrToList(object, values) {
  if (values.length === 2) {
      const [name, phoneNumber] = values;
      object[name] = phoneNumber;
  } else {
      console.error("Invalid input. The values array"+
      " should contain exactly two elements: name and"+
      " phoneNumber.");
  }
  return object;
}
// function deleteUpdateAndSet(arr) {
function parseQuery(arr, element) {
  // elem => array 
  const index = arr.indexOf(element);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}
// HELPERS -- end 

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
function addUser( allObj, argsArr ) {
  // validate usr and telnum 
  let valid = validateUsrAnsTel(argsArr);
  
  if ( valid ) {
    let newList = addNewUsrToList(allObj.main, argsArr);
    // console.error('new val', newList);
    // join to update 3 fns to one --
    let pipeData = objectToStringPipe(newList);
    updateToDB(JSON.stringify(newList), STORAGE_UPDATE, 'add new usr');
    updateToDB(pipeData, STORAGE_MAIN_PIPE, 'add new usr');

  } else {
      console.error('not valid usr tel');
  }
}
function validateUsrAnsTel(argsArr){
  // add to config OBJ with all reg exp 
  const telNumPattern1 = /^\+\d{11}$/;
  const telNumPattern2 = /^\+\d{12}$/;

  // console.log(telNumPattern1.test(argsArr[1]) ||
  //             telNumPattern2.test(argsArr[1]) ); 

  // if(validUsr && validTel) true ;
  return telNumPattern1.test(argsArr[1]) ||
  telNumPattern2.test(argsArr[1]);
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
    // join to update 3 fns to one --
    pipeData = objectToStringPipe(all);
    updateToDB(JSON.stringify(all), STORAGE_UPDATE, 'usr is remove');
    updateToDB(pipeData, STORAGE_MAIN_PIPE, 'usr is remove');

  } else if (tels.includes(itm)) {
      console.log('tel elem', tels, itm)

    all = deletePropertyByValue(all, itm);
    pipeData = objectToStringPipe(all);
    // join to update fns to one --
    updateToDB(JSON.stringify(all), STORAGE_UPDATE, 'usr is remove');
    updateToDB(pipeData, STORAGE_MAIN_PIPE, 'usr is remove');

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