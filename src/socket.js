import io from 'socket.io-client'
import bus from './EventBus'

const prod = location.hostname != 'localhost'

let connStr
if (!prod) {
  connStr = 'http://localhost:3016'
} else {
  connStr = 'https://agilesimulations.co.uk:' + process.env.VUE_APP_PORT
}
console.log('Connecting to: ' + connStr)
const socket = io(connStr)

socket.on('connect_error', (err) => { bus.$emit('connectionError', err) })

socket.on('updateConnections', (data) => { bus.$emit('updateConnections', data) })

// Send

bus.$on('sendAddPlayer', (data) => { socket.emit('sendAddPlayer', data) })

bus.$on('sendDeletePlayer', (data) => { socket.emit('sendDeletePlayer', data) })

bus.$on('sendUpdatePlayer', (data) => { socket.emit('sendDeletePlayer', data) })

bus.$on('sendAddGame', (data) => { socket.emit('sendAddGame', data) })

// Receive

socket.on('updatePlayers', (data) => { bus.$emit('updatePlayers', data) })

socket.on('updateGames', (data) => { bus.$emit('updateGames', data) })

export default bus
