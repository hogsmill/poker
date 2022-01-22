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
           <tr v-for="(player, index) in players" :key="index">
             <td />
             <td>
               {{ player.name }}
              </td>
              <td>
                {{ player.nickname }}
              </td>
              <td>
                {{ player.contact }}
              </td>
           </tr>
          </tbody>
       </table>
      </div>
    </div>
    <div class="admin-tab">
      <div>
        <i v-if="showMeets" @click="setShowMeets(false)" title="collapse" class="fas fa-caret-up toggle" />
        <i v-if="!showMeets" @click="setShowMeets(true)" title="expand" class="fas fa-caret-down toggle" />
        <h3>
          Games
        </h3>
      </div>
      <div v-if="showMeets">
        <select id="new-meet-day">
          <option>
            -- DD --
          </option>
          <option v-for="(n, index) in 31" :key="index">
            {{ n }}
          </option>
        </select>
        <select id="new-meet-month">
          <option>
            -- MM --
          </option>
          <option v-for="(n, index) in 12" :key="index">
            {{ n }}
          </option>
        </select>
        <select id="new-meet-year">
          <option>
            -- YY --
          </option>
          <option v-for="(n, index) in 5" :key="index">
            {{ n + 2021 }}
          </option>
        </select>
        <select id="new-meet-host">
          <option>
            -- Host --
          </option>
          <option v-for="(player, index) in players" :key="index" :value="player.id">
            {{ nameDisplay(player) }}
          </option>
        </select>
        <button class="btn btn-sm btn-site-primary">
          Add New Game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  data() {
    return {
      showPlayers: false,
      showMeets: false,
      players: [
        { id: 1, name: 'steve', nickname: 'doo' },
        { id: 2, name: 'mike', nickname: 'gaffer' }
      ]
    }
  },
  methods: {
    setShowPlayers(val) {
      this.showPlayers = val
    },
    setShowMeets(val) {
      this.showMeets = val
    },
    nameDisplay(player) {
      return player.nickname
        ? player.nickname + ' (' + player.name + ')'
        : player.name
    },
    addPlayer() {
      const name = document.getElementById('new-player-name').value
      const nickname = document.getElementById('new-player-nickname').value
      const contact = document.getElementById('new-player-contact').value
      bus.$emit('sendAddPlayer', {name: name, nickname: nickname, contact: contact})
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

      table {
        margin: 12px auto;

        th {
          border: 1px solid #aaa;
          padding: 2px 12px;
        }

        td {
          border: 1px solid #aaa;
          text-align: left;
          padding: 2px 12px;
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
