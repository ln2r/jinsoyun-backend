module.exports = function(app){
  require('./routes/event.js')(app);
  require('./routes/dungeons.js')(app);
  require('./routes/quests.js')(app);
  require('./routes/challenges.js')(app);
  require('./routes/config.js')(app);
};