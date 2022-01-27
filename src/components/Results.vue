<template>
  <div class="results">
    <h2>
      Table
    </h2>
    <div>
      <table>
        <thead>
          <th>
            Name
          </th>
          <th>
            Played
          </th>
          <th>
            Won
          </th>
          <th>
            Points
          </th>
          <th>
            Win Ratio
          </th>
        </thead>
        <tbody>
          <tr v-for="(result, index) in table" :key="index">
            <td>
              {{ result.results.name }}
            </td>
            <td>
              {{ result.results.played }}
            </td>
            <td>
              {{ result.results.won }}
            </td>
            <td>
              {{ result.results.won * 5 }}
            </td>
            <td>
              {{ result.results.won / result.results.played}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>
      Results
    </h2>
    <table>
      <thead>
        <th>
          Date
        </th>
        <th>
          Host
        </th>
        <th>
          No. of Games
        </th>
        <th>
          Winners
        </th>
      </thead>
      <tbody>
        <tr v-for="(game, index) in games" :key="index">
          <td>
            {{ dateString(game.day, game.month, game.year) }}
          </td>
          <td>
            {{ game.host.name }}
          </td>
          <td>
            {{ game.noOfGames }}
          </td>
          <td>
            <div v-for="(winner, windex) in winners(game)" :key="windex">
              {{ winner }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dateFuns from '../lib/dates.js'

export default {
  computed: {
    games() {
      return this.$store.getters.getGamesSorted
    },
    table() {
      return this.$store.getters.getTable
    },
    players() {
      return this.$store.getters.getPlayers
    }
  },
  methods: {
    dateString(d, m, y) {
      return dateFuns.dateString(d, m, y)
    },
    winners(game) {
      const winners = {}
      for (let i = 1; i <= game.noOfGames; i++) {
        if (game.winners[i]) {
          winners[game.winners[i]] = winners[game.winners[i]]
            ? winners[game.winners[i]] + 1
            : 1
        }
      }
      const ws = []
      const ks = Object.keys(winners)
      const keys = ks.sort((a, b) => {
        return winners[b] - winners[a]
      })
      for (let j = 0; j < keys.length; j++) {
        const player = this.players.find((p) => {
          return p.id == keys[j]
        })
        ws.push(player.name + ' (' + winners[player.id] + ')')
      }
      return ws
    }
  }
}
</script>

<style lang="scss">
  .results {

    h2 {
      margin-top: 36px;
    }

    table {
      margin: 0 auto 24px auto;
      width: 50%;

      td {
        padding: 6px;
        border: 1px solid;
      }
    }
  }
</style>
