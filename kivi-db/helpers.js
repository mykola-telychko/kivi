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
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function deletePropertyByValue(obj, targetValue) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === targetValue) {
        delete obj[key];
      }
    }
    return obj;
}
function buildObjfromArrays(keys, values){
    return  keys.reduce((acc, key, index) => {
      acc[key] = values[index];
      return acc;
    }, {});
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
// function deleteUpdateAndSet(arr) {
function parseQuery(arr, element) {
        // elem => array 
        const index = arr.indexOf(element);
        if (index !== -1) {
          arr.splice(index, 1);
        }
        return arr;
}
function parseTxt(txt) {
  let arr = txt.split("|");
  const [evenArr, oddArr] = explodeArray(arr);
  // console.log( handeQuery(queryArray, oddArr));

  let objUsrTeleph = buildObjfromArrays(evenArr, oddArr);
  return {main: objUsrTeleph, usr: evenArr, tel: oddArr};// finally obj 
}


const add = '+';
function helpFn( newValue) {
    console.log('helpFn::', newValue );
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


// CONVERT ARRAY TO STRING - start
// let array = [1, 2, 3, 4, 5];
// let string = array.join(', '); // "1, 2, 3, 4, 5"
// console.log(string);
// -- 
// let array = [1, 2, 3, 4, 5];
// let string = array.toString(); // "1,2,3,4,5"
// console.log(string);
// -- 
// let array = [1, 2, 3, 4, 5];
// let string = array.map(String).join('-'); // "1-2-3-4-5"
// console.log(string);
// -- 
// let array = [1, 2, 3, 4, 5];
// let string = array.reduce((acc, item) => acc + item, ''); // "12345"
// console.log(string);
// -- 
// let array = [1, 2, 3, 4, 5];
// let string = `Array: ${array.join(', ')}`; // "Array: 1, 2, 3, 4, 5"
// console.log(string);

function arrToString(arr, delimetr){
  // return arr.reduce((acc, item) => acc + item, delimetr); // "12345"
  return arr.join(delimetr);
}
// CONVERT ARRAY TO STRING - end

function getCurrentDateTime() {
  let now = new Date();
  
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0');
  let day = String(now.getDate()).padStart(2, '0');
  
  let hours = String(now.getHours()).padStart(2, '0');
  let minutes = String(now.getMinutes()).padStart(2, '0');
  let seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


module.exports = {
    parseTxt,
    parseQuery,
    filterObjectByValuePrefix,
    buildObjfromArrays,
    deletePropertyByValue,
    capitalizeFirstLetter,
    objectToStringPipe,
    add,
    arrToString,
    getCurrentDateTime,
    helpFn
};