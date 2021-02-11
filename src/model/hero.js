const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
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

exports.heroSchema = heroSchema;