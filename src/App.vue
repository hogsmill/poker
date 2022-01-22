<template>
  <div id="app">
    <Header />
    <div v-if="connectionError" class="not-connected">
      WARNING: You are not connected to the server: {{ connectionError }}
    </div>
    <div v-if="localStorageStatus != 'ok'" class="not-connected">
      WARNING: {{ localStorageStatus }} - please enable cookies in browser settings
    </div>
    <h1>
      Poker Night
    </h1>
    <Results v-if="currentTab == 'results'" />
    <Meets v-if="currentTab == 'meets'" />
  </div>
</template>

<script>
import bus from './socket.js'

import ls from './lib/localStorage.js'

import Header from './components/Header.vue'
import Results from './components/Results.vue'
import Meets from './components/Meets.vue'

export default {
  name: 'App',
  components: {
    Header,
    Results,
    Meets
  },
  computed: {
    connectionError() {
      return this.$store.getters.getConnectionError
    },
    localStorageStatus() {
      return this.$store.getters.getLocalStorageStatus
    },
    currentTab() {
      return this.$store.getters.getTab
    }
  },
  created() {
    this.$store.dispatch('localStorageStatus', ls.check())

    bus.$on('connectionError', (data) => {
      this.$store.dispatch('updateConnectionError', data)
    })

    bus.$on('updateConnections', (data) => {
      this.$store.dispatch('updateConnectionError', null)
      this.$store.dispatch('updateConnections', data)
    })
  }
}
</script>

<style lang="scss">

  h1 {
    margin-top: 24px;
  }

  .not-connected {
    background-color: red;
    color: #fff;
    font-weight: bold;
    margin: 6px;
  }

</style>
