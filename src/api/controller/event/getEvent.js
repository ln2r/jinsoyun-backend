const services = require('../../services/index.js');

async function getEvent(){
    return await services.event.getEventData;
}

module.exports = {
    getEvent
}