const utils = require('../utils/index.js');
const dataModel = require('../models/config.js');

module.exports = function(app) {
  app.get('/config', async(req, res, next) => {
    try{
      const db = await utils.fetchDB('configs', {guild: 0});
          
      res.header('Content-Type','application/json')
        .status(200)
        .send([{
          status: db[0].settings.status,
          not_found: db[0].settings.not_found,
          automation: {
            hunters_refugee: db[0].settings.hunters_refugee,
            item_update: db[0].settings.item_update,
            koldrak_announce: db[0].settings.koldrak_announce,
            reset: db[0].settings.reset,            
            twitter: db[0].settings.twitter,           
          },  
          commands: {
            bid: db[0].settings.bid,
            daily: db[0].settings.daily,
            drop: db[0].settings.drop,
            dungeon: db[0].settings.dungeon,
            event: db[0].settings.event,
            grandharvest: db[0].settings.grandharvest,
            koldrak: db[0].settings.koldrak,
            market: db[0].settings.market,
            nickname: db[0].settings.nickname,
            radd: db[0].settings.radd,
            raddonce: db[0].settings.raddonce,
            rmessage: db[0].settings.rmessage,
            rremove: db[0].settings.rremove,
            reg: db[0].settings.reg,
            setting: db[0].settings.setting,
            shackledisle: db[0].settings.shackledisle,           
            weekly: db[0].settings.weekly,
            who: db[0].settings.who,
          }                
        }], null, 4);
    }catch(err){
      res.header('Content-Type','application/json')
        .status(400)
        .send({
          'code': 400,
          'status': err
        });
    } 
  });

  app.patch('/config', async(req, res) => {        
    dataModel.findOne({guild: 0}, function(err, data){
      if(!data){
        res.status(404);
      }else{
        data.settings.status            = req.body.status;
        data.settings.not_found         = req.body.not_found;
        data.settings.hunters_refugee   = req.body.hunters_refugee;
        data.settings.item_update       = req.body.item_update;
        data.settings.koldrak_announce  = req.body.koldrak_announce;
        data.settings.reset             = req.body.reset;
        data.settings.twitter           = req.body.twitter;
        data.settings.bid               = req.body.bid;
        data.settings.daily             = req.body.daily;
        data.settings.drop              = req.body.drop;
        data.settings.dungeon           = req.body.dungeon;
        data.settings.event             = req.body.event;
        data.settings.grandharvest      = req.body.grandharvest;
        data.settings.koldrak           = req.body.koldrak;
        data.settings.market            = req.body.market;
        data.settings.nickname          = req.body.nickname;
        data.settings.radd              = req.body.radd;
        data.settings.raddonce          = req.body.raddonce;
        data.settings.rmessage          = req.body.rmessage;
        data.settings.rremove           = req.body.rremove;
        data.settings.reg               = req.body.reg;
        data.settings.setting           = req.body.setting;
        data.settings.shackledisle      = req.body.shackledisle;
        data.settings.weekly            = req.body.weekly;
        data.settings.who               = req.body.who;

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
            res.header('Content-Type','application/json')
              .status(400)
              .send({
                'code': 400,
                'status': err
              });
          });
      } 
      
      if(err){
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