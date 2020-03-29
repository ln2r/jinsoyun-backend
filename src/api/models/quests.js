const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: Number,
  name: String,
  location: [String],
  type: {type: Number, _id: false}
}, {
  collection: 'quests',
  versionKey: false
});

module.exports = mongoose.model('quests', dataSchema);