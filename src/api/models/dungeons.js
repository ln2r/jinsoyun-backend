const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: Number,
    name: String,
    type: {type: Number, _id: false},
    requirements: [String],
    guides: [
        {author: String, url: String, _id: false}
    ],
    attack_power: {easy: Number, normal: Number, hard: Number},
    weapon: String,
    rewards: [String]
}, {
    collection: "dungeons",
    versionKey: false
});

module.exports = mongoose.model("dungeons", dataSchema);