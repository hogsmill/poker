import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function createTable(games) {
  const table = {}
  let i
  for (i = 0; i < games.length; i++) {
    table[games.host] = {
      played: 0,
      won: 0
    }
  }
  return games
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
      state.table = createTable(payload)
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
