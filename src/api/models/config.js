const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  guild: Number,
  settings:{
    status: {
      game: {
        name: String,
        type: Number
      },
      status: String,
    },
    not_found: String,
    hunters_refugee: {
      status: Boolean,
      message: String
    },
    item_update: {
      status: Boolean,
      message: String
    },
    koldrak_announce: {
      status: Boolean,
      message: String
    },
    reset: {
      status: Boolean,
      message: String
    },
    twitter: {
      status: Boolean,
      message: String
    },
    bid: {
      status: Boolean,
      message: String
    },
    daily: {
      status: Boolean,
      message: String
    },
    drop: {
      status: Boolean,
      message: String
    },
    dungeon: {
      status: Boolean,
      message: String
    },
    event: {
      status: Boolean,
      message: String
    },
    grandharvest: {
      status: Boolean,
      message: String
    },
    koldrak: {
      status: Boolean,
      message: String
    },
    market: {
      status: Boolean,
      message: String
    },
    nickname: {
      status: Boolean,
      message: String
    },
    radd: {
      status: Boolean,
      message: String
    },
    raddonce: {
      status: Boolean,
      message: String
    },
    rmessage: {
      status: Boolean,
      message: String
    },
    rremove: {
      status: Boolean,
      message: String
    },
    reg: {
      status: Boolean,
      message: String
    },
    setting: {
      status: Boolean,
      message: String
    },
    shackledisle: {
      status: Boolean,
      message: String
    },
    weekly: {
      status: Boolean,
      message: String
    },
    who: {
      status: Boolean,
      message: String
    }
  },
}, {
  collection: 'configs',
  versionKey: false
});

module.exports = mongoose.model('configs', dataSchema);