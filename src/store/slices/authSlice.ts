import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import auth from '@react-native-firebase/auth'
import { PayloadAction } from '@reduxjs/toolkit'

interface UserType {
  email: string | null
  photoUrl: null | string
  displayName: string | null
  uid: string
}

interface StateType {
  isAuthenticated: boolean
  authToken: string | null
  authLoader: boolean
  userInfo: UserType
  refreshToken: string
  fcmToken: string
}

const initialState: StateType = {
  isAuthenticated: false,
  authToken: null,
  authLoader: false,
  userInfo: {
    displayName: null,
    email: '',
    photoUrl: null,
    uid: '',
  },
  refreshToken: '',
  fcmToken: '',
}

export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password)
      // console.log('response from thunk =>', response);
      return response.user
    } catch (error) {
      console.log('error in thunk =>', error)
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message.slice(26))
      } else {
        return thunkAPI.rejectWithValue('Error occurred in login')
      }
    }
  },
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    { name, email, pass }: { name: string; email: string; pass: string },
    thunkAPI,
  ) => {
    try {
      const resp = await auth().createUserWithEmailAndPassword(email, pass)

      if (resp.user) {
        return resp.user
      }
      throw new Error('error in signup')
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message)
      }
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateIsAuthenticated: (state, actions) => {
      state.isAuthenticated = actions.payload
    },
    updateAuthLoader: (state, actions) => {
      state.authLoader = actions.payload
    },
    logout: (state, _) => {
      Object.assign(state, initialState)
    },
    setFcmToken: (
      state,
      actions: PayloadAction<{
        fcm: string
      }>,
    ) => {
      state.fcmToken = actions.payload.fcm
    },
    updateUserInfo: (
      state,
      actions: PayloadAction<{
        displayName: string | null
        email: string | null
        uid: string
        photoUrl: string | null
      }>,
    ) => {
      state.userInfo.displayName = actions.payload.displayName
      state.userInfo.email = actions.payload.email
      state.userInfo.photoUrl = actions.payload.photoUrl
      state.userInfo.uid = actions.payload.uid

      state.isAuthenticated = true
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.authLoader = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.authLoader = false
    })
    builder.addCase(login.fulfilled, (state, action) => {
      if (action?.payload) {
        state.userInfo.displayName = action.payload.displayName
        state.userInfo.email = action.payload.email
        state.userInfo.photoUrl = action.payload.photoURL
        state.userInfo.uid = action.payload.uid

        state.isAuthenticated = true
      }
    })
  },
})

export const {
  updateUserInfo,
  updateIsAuthenticated,
  updateAuthLoader,
  logout,
  setFcmToken,
} = authSlice.actions

export default authSlice.reducer
