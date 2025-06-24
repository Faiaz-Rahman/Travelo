import { io } from 'socket.io-client'

const socket = io('https://travelobackend-r93g.onrender.com', {
  autoConnect: false,
  timeout: 20000,
})

export default socket
