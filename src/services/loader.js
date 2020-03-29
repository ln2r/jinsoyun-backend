const config = require('../config.json');

function loadConfig(){
  process.env.SOYUN_API_DB_CONNECT_URL = config.database.url;
  process.env.SOYUN_API_DB_NAME = config.database.name;
  process.env.SOYUN_API_PORT = config.api.port;

  console.log('[soyun] [api] Config data loaded');
}

module.exports = {
  loadConfig
};