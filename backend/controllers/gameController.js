const Game = require('../models/gameModel')
const { errorHandler } = require('../helpers/dbErrorHandler')


exports.create = (req, res) => {
    const game = new Game(req.body)
    game.save((err, data) => {
        if (err) {
            return res.status(400).json({ err: errorHandler(err) })
        }
        res.json({ data })
    })
}

exports.gameById = (req, res, next, id) => {
    Game.findOne({ id }, ((err, game) => {
        if (err || !game) {
            return res.status(400)
                .json({ err: 'Game not found' })
        }
        res.json({ game })
    }))
}

exports.allGames = (req, res) => {
    const { pages, genres, platform } = req.query

    Game.find({}, ((err, game) => {
        if (err || !game) {
            return res.status(400)
                .json({ err: 'Game not found' })
        }
        const pageCount = Math.ceil(game.length / 100);
        let page = parseInt(pages);
        if (!page) { page = 1 }
        if (page > pageCount) {
            page = pageCount
        }
        res.json({ 'game': game.slice(page * 100 - 100, page * 100), "page": page, "totalPages": pageCount })
    }))
}
