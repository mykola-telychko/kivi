#!/usr/bin/env node
const fs = require('fs');
const path = require("path");
const dbFilePath = path.join(__dirname, 'storage.txt');

const config = require('./config.json');
const COUNTRY_CODE = config.countryCode;
const STORAGE_UPDATE = 'upstorage.txt';

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
console.log('KV:', queryArray);
// handeQuery(queryArray);

// get region telephone num 
function handeQuery(query){
  COUNTRY_CODE

  switch (query[0]) {
    case "READ":
      // let per =  readDbJSON((database) => {  return database;} );

      // get country code NUM on countryName 
      // console.log("It.", COUNTRY_CODE[capitalizeFirstLetter(query[query.length - 1])] );
      // console.log("db.", per)
      return COUNTRY_CODE[capitalizeFirstLetter(query[query.length - 1])];
      // read from db 

      break;
    case "CREATE":
      console.log("It's Tuesday.");
      break;
    case "DELETE":
      console.log("It's Wednesday.");
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
function updateToDB(database) {
  let validData = true;
  if ( validData ) {
      let txt = database;
      fs.writeFile(STORAGE_UPDATE, txt, {encoding: "utf8", flag: "w", mode: 0o666},
          (err) => {
              if (err) console.log(err);
              else { console.log("written"); }
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
          // handeQuery(queryArray);

          //  dbTXT = parseTxt(data); 
          // https://github.com/mykola-telychko/assistant-js
           dbTXT = parseTxt(data); 

           let u = 'PetraDiazKotsiubynska';
          //  let u = '+811590117571';
          //  let u = 'sd';

          // let usrItem = selectName(u, 'value', dbTXT);
          let usrItem = selectName(u, 'key', dbTXT);

            // regexp for detected name or number -updateObjectItem
          // updateObjectItem(dbTXT, Object.keys(usrItem)[0], 'zelupa');
          updateObjectItem(kv, dbTXT, '+914763000853', '+914763111853');


          callback(dbTXT);// get variable outer ,

          //  console.log('txt::', dbTXT);
       } catch (parseError) { console.error('Error parsing JSON:', parseError); }
  });
   return dbTXT;
}
// readDbJSON((database) => { insertTxtDB(database); return database;} );
// readDbJSON((database) => { console.log(database); return database;} );
readDbJSON((database) => { return database;} );


function parseTxt(txt) {
    let arr = txt.split("|");
    const [evenArr, oddArr] = explodeArray(arr);
    let code = handeQuery(queryArray);

    let objectUsrTeleph = buildObjfromArrays(evenArr, oddArr);

    // fetch region 
    // const matchingElements = oddArr.filter(item => item.startsWith("+" + code));

    // console.log('code', Object.keys(objectUsrTeleph));

    return objectUsrTeleph;
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

// const [evenArr, oddArr] = explodeArray(arr0);
// const [evenArr, oddArr] = explodeArray(arrNonUniqueElements);
// console.log(oddArr);

// HELPERS 
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
        // get ID 
        // console.log('val::', item);
  }
  // console.table(buildTable(Object.keys(result),
  //                          Object.values(result)));
  // console.log('val::', result);

  return result;
}

function updateObjectItem(kv, obj, targetKeyOrValue, newValue) {
  console.log(obj, targetKeyOrValue, newValue);
  for (const key in obj) {
    if (key === targetKeyOrValue || obj[key] === targetKeyOrValue) {
      obj[key] = newValue; 
    }
  }

  updateToDB(JSON.stringify(obj));

  return obj;
}