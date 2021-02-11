const mongoose = require('mongoose');

const spellSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    },
    maxLevel: {
        type: Number
    },
    village: {
        type: String
    }
})

exports.spellSchema = spellSchema;