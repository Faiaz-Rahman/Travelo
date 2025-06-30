import React, { useContext, useEffect, useState } from 'react'

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Switch,
  ToastAndroid,
  useColorScheme,
} from 'react-native'
import auth from '@react-native-firebase/auth'

import HomeLayout from '@layouts/HomeLayout'
import Button from '@components/ui/Button'
import AppText from '@components/common/Text'
import { useDispatch, useSelector } from 'react-redux'

import { logout, updateTheme } from '@store/slices/authSlice'
import { Colors } from '@constants'

import { persistor, RootState } from '@store/index'
import { SocketContext } from '../../socket/SocketContext'

export default function Profile() {
  const [user, setUser] = useState<any>({
    name: '',
    email: '',
    createdAt: '',
  })

  const [loading, setLoading] = useState<boolean>(true)

  const [logoutLoader, setLogoutLoader] = useState<boolean>(false)

  const { userInfo, createdAt, username, userTheme } = useSelector(
    (state: RootState) => state.auth,
  )
  const dispatch = useDispatch()
  const { disconnectSocket } = useContext(SocketContext)

  useEffect(() => {
    const currentUser = auth().currentUser
    if (currentUser) {
      setUser({
        name: 'John Doe',
        email: 'test@xyz.com',
        createdAt: '21st August, 2025',
      })
    }
    setLoading(false)
  }, [])

  const handleLogout = async () => {
    setLogoutLoader(true)
    try {
      await auth().signOut()
      dispatch(logout({}))
      disconnectSocket()

      await persistor.purge()

      ToastAndroid.showWithGravity(
        `You've been successfully logged out`,
        1500,
        10,
      )

      setLogoutLoader(false)
    } catch (error) {
      if (error instanceof Error) {
        ToastAndroid.showWithGravity(error.message, 1500, 10)
      }
      setLogoutLoader(false)
    }
  }

  const onSwitchValueChange = (val: boolean) => {
    dispatch(updateTheme({ theme: !val ? 'dark' : 'light' }))
  }

  if (loading) {
    return (
      <HomeLayout noScroll showHeader={false} headerTitle="Profile">
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size="large"
            color={userTheme == 'dark' ? Colors.white : Colors.darkBlack}
          />
        </View>
      </HomeLayout>
    )
  }

  return (
    <HomeLayout noScroll showHeader={false} headerTitle="Profile">
      <View style={styles.container}>
        <AppText styles={styles.title}>My Profile</AppText>

        <View
          style={[
            styles.card,
            {
              borderColor:
                userTheme == 'dark' ? Colors.white : Colors.darkBlack,
            },
          ]}>
          <AppText
            styles={{
              ...styles.label,
            }}>
            Full Name
          </AppText>
          <AppText
            styles={{
              marginTop: 5,
            }}>
            {username}
          </AppText>

          <Text style={styles.label}>Email Address</Text>
          <AppText
            styles={{
              marginTop: 5,
            }}>
            {userInfo.email}
          </AppText>

          <Text style={styles.label}>Toggle Theme</Text>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <AppText styles={{ marginRight: 10 }}>Dark</AppText>
            <Switch
              value={userTheme == 'dark' ? false : true}
              onValueChange={onSwitchValueChange}
              thumbColor={Colors.socialPink}
            />
            <AppText styles={{ marginLeft: 10 }}>Light</AppText>
          </View>

          <Text style={styles.label}>User Since</Text>
          <AppText
            styles={{
              marginTop: 5,
            }}>
            {createdAt}
          </AppText>
        </View>

        <Button
          onPress={() => {
            handleLogout()
          }}
          title="Log out"
        />
      </View>
    </HomeLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 2,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    color: '#111827',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
