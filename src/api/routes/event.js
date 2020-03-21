const utils = require('../utils/index.js');
const dataModel = require('../models/event.js');

module.exports = function(app) {
  app.get('/event', async(req, res, next) => {
    try{
      const db = await utils.fetchDB("event");
          
      res.header("Content-Type","application/json")
        .status(200)
        .send([{
            name: db[0].name,
            duration: db[0].duration,
            redeem: db[0].redeem,
            event_page: db[0].event_page,
            last_event: db[0].last_event,
            last_event_redeem: db[0].last_event_redeem,
            rewards:db[0].rewards,
            todo: db[0].todo,
            quests: db[0].quests
        }], null, 4);
    }catch(err){
      res.header("Content-Type","application/json")
        .status(400)
        .send({
          "code": 400,
          "status": err
        })
    } 
});
  
  app.patch('/event', async(req, res) => {        
    dataModel.findOne({id: 0}, function(err, data){
      if(!data){
        res.status(404)
      }else{
        data.name               = req.body.name;
        data.duration           = req.body.duration;
        data.redeem             = req.body.redeem;
        data.event_page         = req.body.event_page;
        data.last_event         = req.body.last_event;
        data.last_event_redeem  = req.body.last_event_redeem;
        data.rewards            = req.body.rewards;
        data.todo               = req.body.todo;
        data.quests             = req.body.quests;

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
    })
  })
};