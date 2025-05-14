import { createContext } from 'react'
import { io } from 'socket.io-client'

const socket = io('https://travelobackend-r93g.onrender.com', {
  autoConnect: false,
})

export default socket
