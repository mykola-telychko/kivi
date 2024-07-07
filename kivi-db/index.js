#!/usr/bin/env node
const fs = require('fs');
const path = require("path");
const dbFilePath = path.join(__dirname, '/store/storage.txt');

const STORAGE_UPDATE = path.join(__dirname, '/store/upstorage.txt');
const STORAGE_MAIN_PIPE = path.join(__dirname, '/store/storage.txt');

const config = require('./config.json');
const { 
        parseTxt,
        parseQuery,
        filterObjectByValuePrefix,
        buildObjfromArrays,
        deletePropertyByValue,
        capitalizeFirstLetter,
        objectToStringPipe,
} = require('./helpers');

const { 
  selectOnKeyOrVal,
  findRemove,
} = require('./queries');

const { 
  validateUsrAnsTel,
} = require('./validators');

const { 
  updateToDB,
} = require('./model');


const COUNTRY_CODE = config.countryCode;

// Check if at least one command-line argument is provided
if (process.argv.length < 3) {
  console.error('node cli_example.js <message>');
  process.exit(1); // Exit the script with a non-zero status code to indicate an error
}

// Access the command-line argument at index 2 (index 0 and 1 are reserved for node and script name)
// remove first two elms 
// const [, , ... queryArray ] = process.argv.slice(2);
const queryArray = process.argv.slice(2);


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
      let matchingElements;

      if ( code ) {
          // get country code NUM on countryName 
          matchingElements = selectOnCountry(allItems, code);
      } else {
              // -------- KEY/VAL -- start
              // pass KEY if key exists in name // get key or val
              let usrNumParam = queryArray.pop();
              let usrItem;

              if ( obj3Level.usr.includes(usrNumParam) ) {

                  usrItem = selectOnKeyOrVal(usrNumParam, 'key', obj3Level.main);
                  console.log('Receive user::', usrItem);
              } else {

                  usrItem = selectOnKeyOrVal(usrNumParam, 'value', obj3Level.main);
                  console.log('Receive num::', usrItem);
              }
        
              // node .\index.js READ FROM 'HrytsenkoOlhaNina'
              //-------- KEY/VAL -- end
      }
      // console.log('matchingElements::', matchingElements);
      // console.log( query );

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
      break;

    default: console.error("Error!");
  }
}
// node .\drawwork.js SELECT FROM 'canada'
// function insertToDB(database) {

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



              // -------- KEY/VAL -- start
              // let usrNumParam = queryArray.pop();
              // let usrItem = selectOnKeyOrVal(usrNumParam, 'key', obj3Level.main);
              // console.log('Receive user::', usrItem);
              // node .\index.js READ FROM 'HrytsenkoOlhaNina'
              // -------- KEY/VAL -- end


              // -------- COUNTRY --- start
              // obj3Level = parseTxt(data); 
              let TMPqryArr = queryArray;
              // let usrNumParam = queryArray.pop();
              // let usrItem = selectName(usrNumParam, 'key', obj3Level.main);
              // regexp for detected name or number -updateObjectItem
              // get only REGION nums 
              // All-data -> apply query -> result obj 
              //  console.log('txt::', obj3Level.main);
              // console.log('txt::', usrItem);
              console.log('txt::', TMPqryArr);
              let res = handeQuery(TMPqryArr, obj3Level)
              console.log('simpleSelectRegion::', res);
              // handeQuery(queryArray, obj3Level)
              callback(dbTXT);// get variable outer ,
              // -------- COUNTRY --- end



       } catch (parseError) { console.error('Error parsing JSON:', parseError); }
  });
   return dbTXT;
}
// readDbJSON((database) => { console.log(database); return database;} );
// readDbJSON((database) => { return database;} ); // +++
let mod;
     mod = 'select';
if ( mod == 'select' ) {
  readDbJSON((database) => {  return database;} );

}


// txt -> obj //


// HELPERS -- start 
function buildTable(keys, values){
  const tableData = [];
  for (let i = 0; i < Math.max(keys.length, values.length); i++) {
    tableData.push({ Column1: keys[i], Column2: values[i] });
  }
  return tableData;
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
// HELPERS -- end 

// QUERIES LIST 

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
function getUser(){

}
// function validateUsrAnsTel(argsArr){
//   // add to config OBJ with all reg exp 
//   const telNumPattern1 = /^\+\d{11}$/;
//   const telNumPattern2 = /^\+\d{12}$/;

//   // console.log(telNumPattern1.test(argsArr[1]) ||
//   //             telNumPattern2.test(argsArr[1]) ); 

//   // if(validUsr && validTel) true ;
//   return telNumPattern1.test(argsArr[1]) ||
//   telNumPattern2.test(argsArr[1]);
// }

// select on group
function selectOnCountry(telNumsArr, codeCountry){
    let telNums;
    let prefix = codeCountry ? "+" + codeCountry: null;

    if(prefix){
        // console.log('selectOnCountry::', telNumsArr.main, prefix);
        console.log('selectOnCountry::',  prefix);

        telNums = filterObjectByValuePrefix(telNumsArr.main, prefix);
        return telNums;

    } else {
      return 'error';
    }
}



