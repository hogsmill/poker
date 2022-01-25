
const { v4: uuidv4 } = require('uuid')

function newPlayer(data) {
  return {
    id: uuidv4(),
    name: data.name,
    nickname: data.nickname,
    contact: data.contact
  }
}

function newGame(data) {
  return {
    id: uuidv4(),
    day: data.day,
    month: data.month,
    year: data.year,
    host: data.host,
    winner: null,
    players: []
  }
}

function _updatePlayers(db, io) {
  db.playerCollection.find({}).toArray((err, res) => {
    io.emit('updatePlayers', res)
  })
}

function _updateGames(db, io) {
  db.playerCollection.find({}).toArray((err, players) => {
    db.gameCollection.find({}).toArray((err, res) => {
      const games = []
      for (let i = 0; i < res.length; i++) {
        const game = res[i]
        const host = players.find((p) => {
          return p.id == game.host
        })
        game.host = host
        const winner = players.find((p) => {
          return p.id == game.winner
        })
        game.winner = winner
        games.push(game)
      }
      io.emit('updateGames', games)
    })
  })
}

module.exports = {

  updatePlayers: function(db, io, debugOn) {

    if (debugOn) { console.log('updatePlayers') }
    _updatePlayers(db, io)
  },

  updateGames: function(db, io, debugOn) {

    if (debugOn) { console.log('updateGames') }
    _updateGames(db, io)
  },

  addPlayer: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addPlayer', data) }

    const player = newPlayer(data)
    db.playerCollection.insertOne(player, (err) => {
      if (err) throw err
      _updatePlayers(db, io)
    })
  },

  deletePlayer: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deletePlayer', data) }

    db.playerCollection.deleteOne({id: data.id}, (err) => {
      if (err) throw err
      _updatePlayers(db, io)
    })
  },

  updatePlayer: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updatePlayer', data) }

    db.playerCollection.updateOne({id: data.id}, {$set: data.player}, (err) => {
      if (err) throw err
      _updatePlayers(db, io)
    })
  },

  addGame: function(db, io, data, debugOn) {

    if (debugOn) { console.log('addGame', data) }

    const game = newGame(data)
    db.gameCollection.insertOne(game, (err) => {
      if (err) throw err
      _updateGames(db, io)
    })
  },

  updateGame: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateGame', data) }

    db.gameCollection.updateOne({id: data.id}, {$set: data.game}, (err) => {
      if (err) throw err
      _updateGames(db, io)
    })
  },

  updateWinner: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateWinner', data) }

    db.gameCollection.updateOne({id: data.id}, {$set: {winner: data.winner}}, (err) => {
      if (err) throw err
      _updateGames(db, io)
    })
  },

  toggleGamePlayer: function(db, io, data, debugOn) {

    if (debugOn) { console.log('toggleGamePlayer', data) }

    db.gameCollection.findOne({id: data.id}, (err, res) => {
      if (err) throw err
      const players = []
      let found = false
      for (let i = 0; i < res.players.length; i++) {
        if (res.players[i] == data.player) {
          found = true
        } else {
          players.push(res.players[i])
        }
      }
      if (!found) {
        players.push(data.player)
      }
      db.gameCollection.updateOne({id: data.id}, {$set: {players: players}}, (err) => {
        if (err) throw err
        _updateGames(db, io)
      })
    })
  }

}
