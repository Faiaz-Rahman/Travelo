import { useRef, useEffect } from 'react'
import { AppState, StatusBar } from 'react-native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './src/store'
import { Routes } from '@routes/index'
import { Colors } from '@constants'

function App(): React.JSX.Element {
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const listen = AppState.addEventListener('change', nextAppState => {
      console.log('current state for app =>', appState.current)

      if (
        appState.current == 'active' &&
        nextAppState.match(/background|inactive/)
      ) {
        console.log('app has come to the background ...')
      }
      if (appState.current == 'inactive') {
        console.log('your app is inactive !!!')
      }
      appState.current = nextAppState
    })

    return () => {
      listen.remove()
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar backgroundColor={Colors.darkBlack} />
        <Routes />
      </PersistGate>
    </Provider>
  )
}

export default App
