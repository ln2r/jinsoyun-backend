const MongoClient = require('mongodb').MongoClient;

const url = process.env.SOYUN_API_DB_CONNECT_URL;
const dbName = process.env.SOYUN_API_DB_NAME;

/** 
 * mongoGetData
 * Used to get data from MongoDB database
 * @param {String} collname data collection name
 * @param {Object} filter data filter
 * @returns data fetched from databse
 * @example
 *  // Using the function locally with id as it filter
 *  module.exports.mongoGetData("classes", {_id: 0});
 *  
 *  // Using the function outside the file without filter
 *  core.mongoGetData("classes");
 */
module.exports = function (collname, filter, sorting, limit) {
  filter = (filter === null || filter === undefined)? {} : filter;
  sorting = (sorting === null || sorting === undefined)? {} : sorting;
  limit = (limit === null || limit === undefined)? 0 : limit;  
    
  try{
    return MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(async function(db) {
        const dbo = db.db(dbName);
        const result = await dbo.collection(collname).find(filter).sort(sorting).limit(limit).toArray();
                  
        db.close();

        return result;
      })
      .then(function(items) {
        return items;
      });  
  }catch(err){
    console.log(err);
  }         
};
