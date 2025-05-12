import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import { configureStore } from '@reduxjs/toolkit'

import { persistStore, persistReducer } from 'redux-persist'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'

export const rootReducer = combineReducers({
  auth: authReducer,
})

// import authSlice from '../slices/authSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store
