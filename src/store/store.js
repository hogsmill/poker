import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function createTable(players, games) {
  const table = {}
  for (let i = 0; i < players.length; i++) {
    table[players[i].id] = {
      name: players[i].name,
      played: 0,
      won: 0
    }
  }
  for (let j = 0; j < games.length; j++) {
    const game = games[j]
    const gameDate = new Date(game.year, game.month - 1, game.day)
    if (gameDate < new Date()) {
      for (let k = 0; k < game.players.length; k++) {
        const player = game.players[k]
        table[player].played = table[player].played + game.noOfGames
      }
      for (let l = 1; l <= game.noOfGames; l++) {
        const winner = game.winners[l]
        if (winner) {
          table[winner].won = table[winner].won + 1
        }
      }
    }
  }
  const results = []
  for (const key in table) {
    results.push({id: key, results: table[key]})
  }
  return results.sort((a, b) => {
    let sorted
    if (a.results.won == b.results.won) {
      if (a.results.played == b.results.played) {
        sorted = b.results.name < a.results.name
      } else {
        sorted = b.results.played - a.results.played
      }
    } else {
      sorted = b.results.won - a.results.won
    }
    return sorted
  })
}

export const store = new Vuex.Store({
  state: {
    thisGame: 'Poker Club',
    connections: 0,
    connectionError: null,
    localStorageStatus: true,
    tab: 'results',
    players: [],
    games: [],
    table: []
  },
  getters: {
    thisGame: (state) => {
      return state.thisGame
    },
    getConnections: (state) => {
      return state.connections
    },
    getConnectionError: (state) => {
      return state.connectionError
    },
    getLocalStorageStatus: (state) => {
      return state.localStorageStatus
    },
    getTab: (state) => {
      return state.tab
    },
    getPlayers: (state) => {
      return state.players
    },
    getGames: (state) => {
      return state.games
    },
    getGamesSorted: (state) => {
      return state.games.sort((a, b) => {
        const aDate = new Date(a.year, a.month - 1, a.day)
        const bDate = new Date(b.year, b.month - 1, b.day)
        return bDate - aDate
      })
    },
    getTable: (state) => {
      return state.table
    }
  },
  mutations: {
    updateConnections: (state, payload) => {
      state.connections = payload
    },
    updateConnectionError: (state, payload) => {
      state.connectionError = payload
    },
    localStorageStatus: (state, payload) => {
      state.localStorageStatus = payload
    },
    setTab: (state, payload) => {
      state.tab = payload
    },
    updatePlayers: (state, payload) => {
      state.players = payload
    },
    updateGames: (state, payload) => {
      state.games = payload
      state.table = createTable(state.players, payload)
    }
  },
  actions: {
    updateConnections: ({ commit }, payload) => {
      commit('updateConnections', payload)
    },
    updateConnectionError: ({ commit }, payload) => {
      commit('updateConnectionError', payload)
    },
    localStorageStatus: ({ commit }, payload) => {
      commit('localStorageStatus', payload)
    },
    setTab: ({ commit }, payload) => {
      commit('setTab', payload)
    },
    updatePlayers: ({ commit }, payload) => {
      commit('updatePlayers', payload)
    },
    updateGames: ({ commit }, payload) => {
      commit('updateGames', payload)
    },
  }
})
