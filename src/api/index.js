const express = require('express');
const bodyParser = require('body-parser');
const loader = require('../services/loader.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

loader.loadConfig();

cors();

// cors
app.use(function(req, res, next){
  res.header('Content-Type','application/json');
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');  

  next();              
});

// db connection
mongoose.connect(process.env.SOYUN_API_DB_CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('[soyun] [api] Database server connected'); },
  err => { console.log('[soyun] [api] Warning! error occured when connecting: '+ err);}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let server = app.listen(process.env.SOYUN_API_PORT, async function(){
  console.log('[soyun] [api] Server running on: '+server.address().address+':'+server.address().port+'('+server.address().family+')');

  require('./routerController.js')(app);
});