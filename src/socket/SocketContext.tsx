import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react'
import socket from '../socket/socket'

import { useSelector } from 'react-redux'

import { RootState } from '@store/index'

type SocketContextType = {
  isConnected: boolean
  activeUsers: string[]
  emitUserOnline: () => void
  connectSocket: () => void
  disconnectSocket: () => void
}

export const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  activeUsers: [],
  emitUserOnline: () => {},
  connectSocket: () => {},
  disconnectSocket: () => {},
})

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const [isConnected, setIsConnected] = useState(false)
  const [activeUsers, setActiveUsers] = useState<string[]>([])

  const emitUserOnline = useCallback(() => {
    if (userInfo?.uid && socket.connected) {
      console.log(
        `userId [${userInfo.uid}] got online with socket id : ${socket.id}`,
      )

      socket.emit('user-online', userInfo.uid)
    }
  }, [userInfo.uid])

  const connectSocket = useCallback(() => {
    if (!socket.connected) {
      socket.connect()
    }
  }, [])

  const disconnectSocket = () => {
    if (socket.connected) {
      socket.disconnect()

      setIsConnected(false)
      setActiveUsers([])
    }
  }
  useEffect(() => {
    const handleConnect = () => {
      console.log('Connected:', socket.id)
      setIsConnected(true)
      emitUserOnline()
    }

    const handleDisconnect = () => {
      console.log('Disconnected from server')

      disconnectSocket()
      setIsConnected(false)
    }

    const handleActiveUsers = (users: string[]) => {
      console.log('Active users:', users)
      setActiveUsers(users)
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('update-user-status', handleActiveUsers)
    socket.on('connect_error', err => console.log('=> Socket error:', err))

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('update-user-status', handleActiveUsers)
      socket.off('connect_error')
    }
  }, [emitUserOnline])

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        activeUsers,
        emitUserOnline,
        connectSocket,
        disconnectSocket,
      }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
