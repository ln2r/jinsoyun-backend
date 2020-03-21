const utils = require('../utils/index.js');
const dataModel = require('../models/quests.js');

module.exports = function(app) {
  app.get('/quests', async(req, res, next) => {
    try{
      const data = await utils.fetchDB("quests");

      res.header("Content-Type","application/json")
        .status(200)
        .send(JSON.stringify(data, null, 4)); 
    }catch(err){
      res.header("Content-Type","application/json")
        .status(400)
        .send({
            "code": 400,
            "status": err
        })
    }             
  });

  app.get('/quests/:id', async(req, res, next) => {
    try{
      const reqId = parseInt(req.params.id);
      const data = await utils.fetchDB("quests", {id: reqId});

      if(data.length === 0){
        res.header("Content-Type","application/json")
          .status(404)
          .send({
            "code": 404,
            "status": "Nothing Found"
          });
      }else{
        res.header("Content-Type","application/json")
            .status(200)
            .send(JSON.stringify(data, null, 4));
      }  
    }catch(err){
      res.header("Content-Type","application/json")
        .status(400)
        .send({
          "code": 400,
          "status": err
        })
    }      
  });

  app.post('/quests/', (req, res, next) => {
    const data = new dataModel(req.body);
    
    data.save()
      .then(data => {
        res.header("Content-Type","application/json")
          .status(200)
          .send({
            "code": 200,
            "status": "OK"
          })
      })
      .catch(err =>{
        res.header("Content-Type","application/json")
          .status(400)
          .send({
            "code": 400,
            "status": err
          })
        })     
  });
  
  app.patch('/quests/:id', async(req, res, next) => {
    dataModel.findOne({id: req.params.id}, function(err, data){
      if(!data){
        res.status(404)
      }else{
        data.id         = req.body.id;
        data.name       = req.body.name;
        data.location   = req.body.location;
        data.type       = req.body.type;

        data.save()
          .then(data => {
            res.header("Content-Type","application/json")
              .status(200)
              .send({
                "code": 200,
                "status": "OK"
              })
          })
          .catch(err => {
            res.header("Content-Type","application/json")
              .status(400)
              .send({
                "code": 400,
                "status": err
              })
          })
        }

      if(err){
        res.header("Content-Type","application/json")
          .status(500)
          .send({
            "code": 500,
            "status": err
          })
      }
    });
  });

  app.delete('/quests/:id', async(req, res, next) => {
    dataModel.findOneAndDelete({id: req.params.id}, (err, data) => {
      res.header("Content-Type","application/json")
        .status(200)
        .send({
            "code": 200,
            "status": "OK"
        })

      if(err){
        res.header("Content-Type","application/json")
          .status(500)
          .send({
            "code": 500,
            "status": err
          })
      }
    })
  });
};