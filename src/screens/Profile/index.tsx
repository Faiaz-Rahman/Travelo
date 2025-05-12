import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native'
import auth from '@react-native-firebase/auth'

import HomeLayout from '@layouts/HomeLayout'
import Button from '@components/ui/Button'
import AppText from '@components/common/Text'
import { useDispatch } from 'react-redux'
import { logout } from '@store/slices/authSlice'
import { Colors } from '@constants'
import { persistor } from '@store/index'

export default function Profile() {
  const [user, setUser] = useState<any>({
    name: '',
    email: '',
    createdAt: '',
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [logoutLoader, setLogoutLoader] = useState<boolean>(false)

  const dispatch = useDispatch()

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

  if (loading) {
    return (
      <HomeLayout noScroll>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </HomeLayout>
    )
  }

  return (
    <HomeLayout noScroll>
      <View style={styles.container}>
        <AppText styles={styles.title}>My Profile</AppText>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <AppText
            styles={{
              marginTop: 5,
            }}>
            {user?.name}
          </AppText>

          <Text style={styles.label}>Email Address</Text>
          <AppText
            styles={{
              marginTop: 5,
            }}>
            {user?.email}
          </AppText>

          <Text style={styles.label}>User Since</Text>
          <AppText
            styles={{
              marginTop: 5,
            }}>
            {user?.createdAt}
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
    borderColor: Colors.white,
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
