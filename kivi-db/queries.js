
const { 
    updateToDB,
} = require('./model');
const { 
    deletePropertyByValue,
    objectToStringPipe,
} = require('./helpers');
const { 
  validateTel, validateUsr,
} = require('./validators');
const config = require('./config.json');

const path = require("path");
const STORAGE_UPDATE = path.join(__dirname, '/store/upstorage.txt');
const STORAGE_MAIN_PIPE = path.join(__dirname, '/store/storage.txt');
const COUNTRIES = config.countries;

function selectOnKeyOrVal(item, kvt, object){
  
    // console.log('selectName::', item, kv, object);
    let obj = object;
    const result = {};
    const kv = detectedArgs(item);
  
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

// controller 
function detectedArgs(str){
  // console.log('validateUsrAnsTel::', validateTel(str), str);

  if ( COUNTRIES.includes(str) ) {

      // console.log('country::', str);
      return 'country';

  } else if ( validateTel(str) ) {

      // console.log('tel::', str);
      // return 'number';
      return 'value';

  } else if ( validateUsr(str) ) { 

      // console.log('usr::', str);
      // return 'user';
      return 'key';
      
  } else { return 'error'; }
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
        // console.log('tel elem', tels, itm)
  
      all = deletePropertyByValue(all, itm);
      pipeData = objectToStringPipe(all);
      // join to update fns to one --
      updateToDB(JSON.stringify(all), STORAGE_UPDATE, 'usr is remove');
      updateToDB(pipeData, STORAGE_MAIN_PIPE, 'usr is remove');
  
    } else { console.log('no elem')}
    // read // find // remove // write-update 
}

module.exports = {
    selectOnKeyOrVal,
    findRemove,
};