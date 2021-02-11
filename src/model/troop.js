const mongoose = require('mongoose');

const troopSchema = new mongoose.Schema({
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

exports.troopSchema = troopSchema;