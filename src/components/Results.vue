<template>
  <div class="results">
    <h2>
      Table
    </h2>
    <div>
      {{ table }}
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
          Winner
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
            {{ game.winner ? game.winner.name : '' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import bus from '../socket.js'
//
import dateFuns from '../lib/dates.js'

export default {
  computed: {
    games() {
      return this.$store.getters.getGamesSorted
    },
    table() {
      return this.$store.getters.getTable
    }
  },
  methods: {
    dateString(d, m, y) {
      return dateFuns.dateString(d, m, y)
    }
  }
}
</script>

<style lang="scss">
  .results {

    table {
      margin: 0 auto;
      width: 50%;

      td {
        padding: 6px;
        border: 1px solid;
      }
    }
  }
</style>
