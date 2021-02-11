const mongoose = require('mongoose');

const archievementSchema = new mongoose.Schema({
    name: {
        type: String
    },
    stars: {
        type: Number
    },
    value: {
        type: String
    },
    target: {
        type: String
    },
    info: {
        type: String
    },
    completionInfo: {
        type: String
    },
    village: {
        type: String
    }
})

exports.archievementSchema = archievementSchema;