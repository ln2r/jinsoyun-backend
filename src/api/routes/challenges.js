const utils = require('../utils/index.js');
const dataModel = require('../models/challenges.js');

module.exports = function (app){
  app.get('/challenges', async(req, res, next) => {
    try{
      const data = await utils.fetchDB('challenges');

      res.header('Content-Type','application/json')
        .status(200)
        .send(JSON.stringify(data, null, 4)); 
    }catch(err){
      console.error(err);
      res.header('Content-Type','application/json')
        .status(400)
        .send({
          'code': 400,
          'status': err
        });
    }
  });

  app.get('/challenges/:id', async(req, res, next) => {
    try{
      const reqId = parseInt(req.params.id);
      const data = await utils.fetchDB('challenges', {id: reqId});

      if(data.length === 0){
        res.header('Content-Type','application/json')
          .status(404)
          .send({
            'code': 404,
            'status': 'Nothing Found'
          });
      }else{
        res.header('Content-Type','application/json')
          .status(200)
          .send(JSON.stringify(data, null, 4));
      }  
    }catch(err){
      console.error(err);
      res.header('Content-Type','application/json')
        .status(400)
        .send({
          'code': 400,
          'status': err
        });
    }        
  });

  app.patch('/challenges/:id', async(req, res, next) => {
    dataModel.findOne({id: req.params.id}, function(err, data){
      if(!data){
        res.status(404);
      }else{
        data.id      = req.body.id;
        data.name    = req.body.name;
        data.rewards = req.body.rewards;
        data.quests  = req.body.quests;

        data.save()
          .then(data => {
            res.header('Content-Type','application/json')
              .status(200)
              .send({
                'code': 200,
                'status': 'OK'
              });
          })
          .catch(err => {
            console.error(err);
            res.header('Content-Type','application/json')
              .status(400)
              .send({
                'code': 400,
                'status': err
              });
          });
      }

      if(err){
        console.error(err);
        res.header('Content-Type','application/json')
          .status(500)
          .send({
            'code': 500,
            'status': err
          });
      }
    });
  });
};