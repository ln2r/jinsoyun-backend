const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: Number,
  name: String,
  rewards: [
    {name: String, tier: Number, _id: false}
  ],
  quests: [
    {name: String, location: [String], _id: false}
  ]
}, {
  collection: 'challenges',
  versionKey: false
});

module.exports = mongoose.model('challenges', dataSchema);