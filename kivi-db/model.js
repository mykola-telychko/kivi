const fs = require('fs');
const path = require("path");
const dbFilePath = path.join(__dirname, '/store/storage.txt');
const logFilePath = path.join(__dirname, '/store/log.txt');
const { 
    getCurrentDateTime,
    arrToString
} = require('./helpers');

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

function appendToLogQuery( db, arrQuery) {
    let validData = true;
    if (validData) {
       
        let str = "\n" + getCurrentDateTime() + ' | ' + arrToString(arrQuery, " ");

        fs.appendFile(db, str, { encoding: 'utf8', mode: 0o666 }, (err) => {
            if (err) console.log(err);
            else console.log("Log updated! ", arrQuery[0]);
        });
    }
}


  
module.exports = {
    updateToDB,
    appendToLogQuery
};