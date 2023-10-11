const fs = require('fs');
const path = require("path");
const dbFilePath = path.join(__dirname, '/store/storage.txt');

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


  
module.exports = {
    updateToDB,
  };