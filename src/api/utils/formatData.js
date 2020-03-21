/**
 * setDataFormat
 * used to change the fetched data "_id" field into "id"
 * @param data unformatted data
 * @returns formatted data
 */
function setDataFormat(data){

    let formatted = JSON.parse(JSON.stringify(data).split("'_id':").join("'id':"));

    return formatted;
}

module.exports = {
    setDataFormat
}