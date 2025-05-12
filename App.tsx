import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './src/store'
import { Routes } from '@routes/index'
import { Colors } from '@constants'

function App(): React.JSX.Element {
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
