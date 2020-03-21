const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: Number,
  name: String,
  duration: String,
  redeem: String,
  event_page: String,
  last_event: String,
  last_event_redeem: String,
  rewards:{
    daily: [
        {name: String, tier: Number, _id: false}
    ],
    weekly:[
        {name: String, tier: Number, _id: false}
    ]
  }, 
  todo: [String],
  quests: [
    {name: String, location: [String], day: [String], _id: false}
  ]
}, {
  collection: "event",
  versionKey: false
});

module.exports = mongoose.model("event", dataSchema);