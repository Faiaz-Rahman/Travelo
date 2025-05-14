import { NavigationContainer } from '@react-navigation/native'

import { MainRouter } from '@routes/MainRouter'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
import AuthRoute from './AuthRoute'

import { SocketProvider } from '../socket/SocketContext'

export const Routes = (): React.JSX.Element => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return (
    <NavigationContainer>
      <SocketProvider>
        {isAuthenticated ? <MainRouter /> : <AuthRoute />}
      </SocketProvider>
    </NavigationContainer>
  )
}
