const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    iconUrls: {
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

exports.leagueSchema = leagueSchema;