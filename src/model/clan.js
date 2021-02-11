const mongoose = require('mongoose');

const clanSchema = new mongoose.Schema({
    tag: {
        type: String
    },
    name: {
        type: String
    },
    clanLevel: {
        type: Number
    },
    badgeUrls: {
        type: {
            small: {
                type: String
            },
            large: {
                type: String
            },
            medium: {
                type: String
            }
        }
    }
})

exports.clanSchema = clanSchema;