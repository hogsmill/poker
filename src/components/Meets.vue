<template>
  <div class="meets">
    <div class="admin-tab">
      <div>
        <i v-if="showPlayers" @click="setShowPlayers(false)" title="collapse" class="fas fa-caret-up toggle" />
        <i v-if="!showPlayers" @click="setShowPlayers(true)" title="expand" class="fas fa-caret-down toggle" />
        <h3>
          Players
        </h3>
      </div>
      <div v-if="showPlayers">
        <table>
          <tr>
            <td>
              Name
            </td>
            <td>
              <input id="new-player-name">
            </td>
          </tr>
          <tr>
            <td>
              Nickname
            </td>
            <td>
              <input id="new-player-nickname">
            </td>
          </tr>
          <tr>
            <td>
              Contact
            </td>
            <td>
              <input id="new-player-contact">
            </td>
          </tr>
          <tr>
            <td colspan="2" class="right">
              <button class="btn btn-sm btn-site-primary" @click="addPlayer()">
                Add New Player
              </button>
            </td>
          </tr>
        </table>
        <table>
          <thead>
            <tr>
              <th>
                Actions
              </th>
              <th>
                Name
              </th>
              <th>
                Nickname
              </th>
              <th>
                Contact
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in players" :key="index" class="player-row">
              <td>
                <i class="fas fa-trash-alt" :title="'Delete ' + player.name" @click="deletePlayer(player)" />
                <i v-if="editingPlayer != player.id" class="fas fa-edit" :title="'Edit ' + player.name" @click="editPlayer(player.id)" />
                <i v-if="editingPlayer == player.id" class="fas fa-save" :title="'Save ' + player.name" @click="savePlayer(player.id)" />
              </td>
              <td>
                <div v-if="editingPlayer != player.id">
                  {{ player.name }}
                </div>
                <input v-if="editingPlayer == player.id" :id="'edit-player-name-' + player.id" :value="player.name">
              </td>
              <td>
                <div v-if="editingPlayer != player.id">
                  {{ player.nickname }}
                </div>
                <input v-if="editingPlayer == player.id" :id="'edit-player-nickname-' + player.id" :value="player.nickname">
              </td>
              <td>
                <div v-if="editingPlayer != player.id">
                  {{ player.contact }}
                </div>
                <input v-if="editingPlayer == player.id" :id="'edit-player-contact-' + player.id" :value="player.contact">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="admin-tab">
      <div>
        <i v-if="showGames" @click="setShowGames(false)" title="collapse" class="fas fa-caret-up toggle" />
        <i v-if="!showGames" @click="setShowGames(true)" title="expand" class="fas fa-caret-down toggle" />
        <h3>
          Games
        </h3>
      </div>
      <div v-if="showGames">
        <select id="new-game-day">
          <option value="">
            -- DD --
          </option>
          <option v-for="(n, dindex) in 31" :key="dindex">
            {{ n }}
          </option>
        </select>
        <select id="new-game-month">
          <option value="">
            -- MM --
          </option>
          <option v-for="(n, mindex) in 12" :key="mindex" :value="n">
            {{ months[n] }}
          </option>
        </select>
        <select id="new-game-year">
          <option value="">
            -- YY --
          </option>
          <option v-for="(n, yindex) in 5" :key="yindex">
            {{ n + 2021 }}
          </option>
        </select>
        <select id="new-game-host">
          <option value="">
            -- Host --
          </option>
          <option v-for="(player, pindex) in players" :key="pindex" :value="player.id">
            {{ nameDisplay(player) }}
          </option>
        </select>
        <button class="btn btn-sm btn-site-primary" @click="addGame()">
          Add New Game
        </button>
      </div>
      <table v-if="showGames">
        <thead>
          <tr>
            <th>
              Actions
            </th>
            <th>
              No. of Games
            </th>
            <th>
              Winners
            </th>
            <th>
              Game
            </th>
            <th>
              Players
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, gindex) in games" :key="gindex">
            <td>
              <i class="fas fa-trash-alt" title="Delete this game" @click="deleteGame(game)" />
              <i v-if="editingGame != game.id" class="fas fa-edit" title="Edit this game" @click="editGame(game.id)" />
              <i v-if="editingGame == game.id" class="fas fa-save" title="Save this game" @click="saveGame(game.id)" />
            </td>
            <td>
              <select :id="'no-of-games-' + game.id" :value="game.noOfGames" @change="setNoOfGames(game.id)">
                <option value="">
                  -- Select --
                </option>
                <option v-for="(n, nindex) in 10" :key="nindex">
                  {{ n }}
                </option>
              </select>
            </td>
            <td>
              <div class="game-players-header">
                <i v-if="showGameWinners == game.id" @click="setShowGameWinners()" title="collapse" class="fas fa-caret-up" />
                <i v-if="showGameWinners != game.id" @click="setShowGameWinners(game.id)" title="expand" class="fas fa-caret-down" />
              </div>
              <div v-if="showGameWinners == game.id">
                <div v-for="(n, nindex) in game.noOfGames" :key="nindex" class="game-winners">
                  <div>
                    Game {{ n }}
                  </div>
                  <div>
                    <select :id="'game-winner-' + game.id + '-' + n" class="winner-select" @change="setWinner(game.id, n)">
                      <option>
                        -- Select --
                      </option>
                      <option
                        v-for="(player, pindex) in players" :key="pindex"
                        :value="player.id" :class="{'hide-option' : !gamePlayer(game, player)}"
                        :selected="game.winners[n] == player.id"
                      >
                        {{ nameDisplay(player) }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </td>
            <td class="edit-game">
              <div v-if="editingGame != game.id" class="display-game">
                {{ dateDisplay(game.day, game.month, game.year) }} - {{ game.host.name }}
              </div>
              <div v-if="editingGame == game.id">
                <select :id="'editing-game-day-' + game.id" :value="game.day">
                  <option value="">
                    -- DD --
                  </option>
                  <option v-for="(n, dindex) in 31" :key="dindex">
                    {{ n }}
                  </option>
                </select>
                <select :id="'editing-game-month-' + game.id" :value="game.month">
                  <option value="">
                    -- MM --
                  </option>
                  <option v-for="(n, mindex) in 12" :key="mindex" :value="n">
                    {{ months[n] }}
                  </option>
                </select>
                <select :id="'editing-game-year-' + game.id" :value="game.year">
                  <option value="">
                    -- YY --
                  </option>
                  <option v-for="(n, dindex) in 5" :key="dindex">
                    {{ n + 2021 }}
                  </option>
                </select>
                <select :id="'editing-game-host-' + game.id" :value="game.host.id">
                  <option value="">
                    -- Host --
                  </option>
                  <option v-for="(player, pindex) in players" :key="pindex" :value="player.id">
                    {{ nameDisplay(player) }}
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div class="game-players-header">
                ({{ game.players.length }})
                <i v-if="showGamePlayers == game.id" @click="setShowGamePlayers()" title="collapse" class="fas fa-caret-up" />
                <i v-if="showGamePlayers != game.id" @click="setShowGamePlayers(game.id)" title="expand" class="fas fa-caret-down" />
              </div>
              <div v-if="showGamePlayers == game.id" class="game-players">
                <div v-for="(player, pindex) in players" :key="pindex">
                  <input type="checkbox" :id="'game-player-' + player.id" :checked="gamePlayer(game, player)" @click="toggleGamePlayer(game, player)">
                  {{ nameDisplay(player) }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import dateFuns from '../lib/dates.js'

export default {
  data() {
    return {
      showPlayers: false,
      showGames: false,
      showGamePlayers: '',
      showGameWinners: '',
      editingPlayer: '',
      editingGame: '',
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
      }
    }
  },
  computed: {
    players() {
      return this.$store.getters.getPlayers
    },
    games() {
      return this.$store.getters.getGames
    }
  },
  methods: {
    setShowPlayers(val) {
      this.showPlayers = val
    },
    setShowGames(val) {
      this.showGames = val
    },
    setShowGamePlayers(val) {
      this.showGamePlayers = val
    },
    setShowGameWinners(val) {
      this.showGameWinners = val
    },
    nameDisplay(player) {
      return player.nickname
        ? player.nickname + ' (' + player.name + ')'
        : player.name
    },
    dateDisplay(d, m, y) {
      return dateFuns.dateString(d, m, y)
    },
    addPlayer() {
      const name = document.getElementById('new-player-name').value
      const nickname = document.getElementById('new-player-nickname').value
      const contact = document.getElementById('new-player-contact').value
      bus.emit('sendAddPlayer', {name: name, nickname: nickname, contact: contact})
    },
    deletePlayer(player) {
      if (confirm('Delete ' + player.name)) {
        bus.emit('sendDeletePlayer', {id: player.id})
      }
    },
    editPlayer(id) {
      this.editingPlayer = id
    },
    savePlayer(id) {
      const name = document.getElementById('edit-player-name-' + id).value
      const nickname = document.getElementById('edit-player-nickname-' + id).value
      const contact = document.getElementById('edit-player-contact-' + id).value
      bus.emit('sendUpdatePlayer', {id: id, player: {name: name, nickname: nickname, contact: contact}})
      this.editingPlayer = ''
    },
    addGame() {
      const day = document.getElementById('new-game-day').value
      const month = document.getElementById('new-game-month').value
      const year = document.getElementById('new-game-year').value
      const host = document.getElementById('new-game-host').value
      if (!day || !month ||!year || !host) {
        alert('Please complete all fields')
      } else {
        bus.emit('sendAddGame', {day: day, month: month, year: year, host: host})
      }
    },
    editGame(id) {
      this.editingGame = id
    },
    saveGame(id) {
      const day = document.getElementById('editing-game-day-' + id).value
      const month = document.getElementById('editing-game-month-' + id).value
      const year = document.getElementById('editing-game-year-' + id).value
      const host = document.getElementById('editing-game-host-' + id).value
      if (!day || !month ||!year || !host) {
        alert('Please complete all fields')
      } else {
        bus.emit('sendUpdateGame', {id: id, game: {day: day, month: month, year: year, host: host}})
      }
      this.editingGame = ''
    },
    setNoOfGames(id) {
      const n = document.getElementById('no-of-games-' + id).value
      bus.emit('sendUpdateNoOfGames', {id: id, noOfGames: n})
    },
    setWinner(id, n) {
      const winner = document.getElementById('game-winner-' + id + '-' + n).value
      bus.emit('sendUpdateWinner', {id: id, game: n, winner: winner})
    },
    gamePlayer(game, player) {
      return game.players.find((p) => {
        return p == player.id
      })
    },
    toggleGamePlayer(game, player) {
      bus.emit('sendToggleGamePlayer', {id: game.id, player: player.id})
    }
  }
}
</script>

<style lang="scss">
  .meets {

    .admin-tab {
      border: 1px solid #888;
      margin: 12px auto;
      width: 90%;

      .right {
        text-align: right;
      }

      h3 {
        text-align: left;
        padding: 12px;
      }

      .fas {
        margin: 2px 3px;
        &.fa-save {
          margin: 2px 5px;
        }
      }

      table {
        margin: 12px auto;

        .player-row {
          div {
            width: 178px;
            height: 30px;
          }
        }

        th {
          border: 1px solid #aaa;
          padding: 2px 12px;
        }

        td {
          border: 1px solid #aaa;
          padding: 2px 12px;
          vertical-align: middle;

          &.edit-game {
            vertical-align: middle;

            div {
              width: 450px;
              height: 40px;

              &.display-game {
                padding-top: 6px;
                text-align: left;
              }
            }
          }

          .game-players-header {
            text-align: right;
            width: 200px;
          }

          .game-players {
            text-align: left;
          }

          .game-winners {
            div {
              display: inline-block;

              &:nth-of-type(1) {
                width: 30%;
              }
              &:nth-of-type(2) {
                width: 70%;
              }
            }
          }

          .winner-select {
            .hide-option {
              display: none;
            }
          }
        }
      }

      .fas {
        color: #aaa;

        &:hover {
        cursor: pointer;
        color: #444;
        }

        &.toggle {
          float: right;
          font-size: xx-large;
          margin-right: 6px;
        }
      }

      select {
        margin: 6px;
      }
    }
  }
</style>
