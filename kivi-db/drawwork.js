#!/usr/bin/env node
const fs = require('fs');
const path = require("path");
const dbFilePath = path.join(__dirname, 'storage.txt');

const config = require('./config.json');
const COUNTRY_CODE = config.countryCode;


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

           
           callback(dbTXT);// get variable outer ,

          //  console.log('txt::', dbTXT);
       } catch (parseError) { console.error('Error parsing JSON:', parseError); }
       // console.log('data::', dbJSON);
  });
   return dbTXT;
}
// readDbJSON((database) => { insertTxtDB(database); return database;} );
readDbJSON((database) => { console.log(database); return database;} );

function parseTxt(txt){
  let arr = txt.split("|");
  const [evenArr, oddArr] = explodeArray(arr);

 let code = handeQuery(queryArray);


  const matchingElements = oddArr.filter(item => item.startsWith("+" + code));

  console.log('code', matchingElements);

  return ;
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