const mongoose = require('mongoose');

const { clanSchema } = require('./clan');
const { leagueSchema } = require('./league');
const { archievementSchema } = require('./archievement');
const { troopSchema } = require('./troop');
const { heroSchema } = require('./hero');
const { spellSchema } = require('./spell');

const playerSchema = new mongoose.Schema({
    tag: {
        type: String
    },
    name: {
        type: String
    },
    townHallLevel: {
        type: Number
    },
    expLevel: {
        type: Number
    },
    trophies: {
        type: Number
    },
    bestTrophies: {
        type: Number
    },
    warStars: {
        type: Number
    },
    attackWins: {
        type: Number
    },
    defenseWins: {
        type: Number
    },
    builderHallLevel: {
        type: Number
    },
    versusTrophies: {
        type: Number
    },
    bestVersusTrophies: {
        type: Number
    },
    versusBattleWins: {
        type: Number
    },
    role: {
        type: String
    },
    donations: {
        type: Number
    },
    donationsReceived: {
        type: Number
    },
    clan: {
        type: clanSchema
    },
    league: {
        type: leagueSchema
    },
    achievements: {
        type: [archievementSchema]
    },
    versusBattleWinCount: {
        type: String
    },
    troops: {
        type: [troopSchema]
    },
    heroes: {
        type: [heroSchema]
    },
    spells: {
        type: [spellSchema]
    }
}, { timestamps: true });

playerSchema.methods.compareWithTheLast = async function () {
    const actualSnapshot = this;
    let d
    if (actualSnapshot.createdAt) {
        d = new Date(actualSnapshot.createdAt);
    } else {
        d = new Date();
    }
    const lastDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
    const lastSnapshot = await Player.findOne({ createdAt: { $gte: lastDate, $lte: d }, tag: actualSnapshot.tag }).limit(1);

    console.log(getGold(lastSnapshot, actualSnapshot))
    console.log(getElixir(lastSnapshot, actualSnapshot))
    console.log(getDarkElixir(lastSnapshot, actualSnapshot))

}

const getDarkElixir = (last, actual) => {
    const HEROIC_HEIST = 'Heroic Heist';
    return getStadistic(HEROIC_HEIST, last, actual);

}

const getGold = (last, actual) => {
    const GOLD_GRAB = 'Gold Grab';
    return getStadistic(GOLD_GRAB, last, actual);
}

const getElixir = (last, actual) => {
    const ELIXIR_ESCAPADE = 'Elixir Escapade';
    return getStadistic(ELIXIR_ESCAPADE, last, actual);
}

const getStadistic = (stadistic, last, actual) => {
    const goldGrabedUntilYesterday = last.achievements.find(a => a.name === stadistic);
    const goldGrabedToday = actual.achievements.find(a => a.name === stadistic);
    const d1 = goldGrabedUntilYesterday.value;
    const d2 = goldGrabedToday.completionInfo.value;
    return {
        stadistic,
        last: d1,
        actual: d2,
        diference: d2 - d1
    }
}


const Player = mongoose.model('Player', playerSchema);

exports.Player = Player;
exports.playerSchema = playerSchema;