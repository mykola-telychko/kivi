

// BUILD DATA GENERATOR FOR FILL KEY-VALUE DB
const COUNTRY_CODE = {
            "US": 1, "Canada": 19,
            "United Kingdom": 44, 'Australia': 61,
            "Germany": 49, "France": 33, "Japan": 81,
            "Brazil": 55, "India": 91, "China": 86
}

const NAMES =  ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia', 'James', 'Sophia',
'Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller', 'Davis', 'Garcia'];

const QTY = 40;

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

let nam = genRandNames( QTY, NAMES); 
let num = genTelNums( QTY);

  console.table( buildTable(nam, num) );
  

// console.log(  generateRanKit('sdfsd', 3));
