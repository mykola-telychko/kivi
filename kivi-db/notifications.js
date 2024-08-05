const { 
    isObject, isEpmty
} = require('./helpers');

function analyzeDbResponse(resultFromDb, entity) {
    // entity - user or num / key or val
   
    if ( isObject(resultFromDb) && !isEpmty(resultFromDb, 'obj') ) {

       console.log('analyzeDbResponse', isEpmty(resultFromDb, 'obj'))

       return resultFromDb;
        // return 'no data in db';
    // } else { console.error("\n", '<= ERROR IN DB SERVER =>', "\n") }
    } else { console.error("\n", '<= no data in db =>', "\n") }

}

module.exports = {
    analyzeDbResponse,
};