const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    added: Number,
    background_image: String,
    esrb_rating: Object,
    genres: Array,
    id: {
        type: Number,
        trim: true,
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    parent_platforms: Array,
    platforms: Array,
    playtime: Number,
    rating: Number,
    rating_top: Number,
    released: String,
    short_screenshots: Array,
    slug: String,
    tags: Array,
    tba: Boolean,
    updated: String
}, { timestamps: true })


module.exports = mongoose.model('game', gameSchema)