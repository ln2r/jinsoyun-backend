const getDBData = require('./fetchDB.js');
const MongoClient = require("mongodb").MongoClient;

const url = process.env.SOYUN_API_DB_CONNECT_URL;
const dbName = process.env.SOYUN_API_DB_NAME;

/**
 * sendAPIStats
 * Counting current day api call
 * @param {Date} date current date
 */
async function sendAPIStats(){
    let date = new Date();
        date = date.getUTCDate()+"-"+date.getUTCMonth()+"-"+date.getUTCFullYear();
    let statsCollectionName = "apiStats";
    let statsData = await getDBData(statsCollectionName, {date: date});
    let todayStats = 0;
    let payload;

    //console.debug("[core] [bot-stats] stats data: "+JSON.stringify(statsData));

    if(statsData.length == 0){
        todayStats++;

        payload = {
            "date": date,
            "count": todayStats
        };
    }else{
        todayStats = statsData[0].count + 1;
    }        

    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);

        if(statsData.length == 0){
            dbo.collection(statsCollectionName).insertOne(payload, function(err, res) {  
                if (err) throw err;    
                db.close();                
            });
        }else{
            dbo.collection(statsCollectionName).updateOne({"date": date},
            {$set: {"count": todayStats}}, function(err, res) {  
                if (err) throw err;    
                db.close();                
            });
        };            
    });
}

module.exports = {
    sendAPIStats
}