
const { v4: uuid } = require('uuid')

function newPlayer(data) {
  return {
    id: uuidv4(),
    name: data.name,
    nickname: data.nickname,
    contact: data.contact
  }
}

function _updatePlayers(db, io) {
  db.gameCollection.find({}).toArray((err) => {
    io.emit('updatePlayers', res)
  })
}

module.exports = {

  addPlayer: function(db, io, data, debugOn, updating) {

    if (debugOn) { console.log('addPlayer', data) }

    const player = newPlayer(data)
    db.gameCollection.insertOne(player, (err) => {
      if (err) throw err
      _updatePlayers(db, io)
    })
  }

}
