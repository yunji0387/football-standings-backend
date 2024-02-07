const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    id: Number,
    name: String,
    shortName: String,
    tla: String,
    crest: String
});

const TableEntrySchema = new mongoose.Schema({
    position: Number,
    team: TeamSchema,
    playedGames: Number,
    won: Number,
    draw: Number,
    lost: Number,
    points: Number,
    goalsFor: Number,
    goalsAgainst: Number,
    goalDifference: Number
});

const StandingSchema = new mongoose.Schema({
    stage: String,
    type: String,
    group: String,
    table: [TableEntrySchema]
});

const SeasonSchema = new mongoose.Schema({
    id: Number,
    startDate: String,
    endDate: String,
    currentMatchday: Number,
    winner: String
});

const AreaSchema = new mongoose.Schema({
    id: Number,
    name: String,
    code: String,
    flag: String
});

const CompetitionSchema = new mongoose.Schema({
    id: Number,
    name: String,
    code: String,
    type: String,
    emblem: String
});

const StandingsSchema = new mongoose.Schema({
    area: AreaSchema,
    competition: CompetitionSchema,
    season: SeasonSchema,
    standings: [StandingSchema]
});

const LeagueStandings = mongoose.model('LeagueStandings', StandingsSchema);

module.exports = LeagueStandings;
