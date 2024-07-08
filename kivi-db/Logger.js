const { 
    appendToLogQuery
} = require('./model');

function loggingQueries( db, arrQuery ) {
   return appendToLogQuery(arrQuery, db);
}

  
module.exports = {
    loggingQueries,
};