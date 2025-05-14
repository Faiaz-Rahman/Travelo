import React, { useCallback, useContext, useState } from 'react'

import HomeLayout from '@layouts/HomeLayout'
import AppText from '@components/common/Text'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Colors, Dim } from '@constants'

import socket from '../../socket/socket'
import ActiveUserComponent from '@components/common/ActiveUserComponent'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { SocketContext } from '../../socket/SocketContext'

import firestore from '@react-native-firebase/firestore'

interface userDetailsData {
  createdAt: string
  email: string
  fcm: string
  name: string
}

export default function ActiveUsersList() {
  const [users, setUsers] = useState<any>([])
  const { userInfo } = useSelector((state: RootState) => state.auth)

  const [userDetailsData, setUserDetailsData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { isConnected, activeUsers, emitUserOnline } = useContext(SocketContext)

  useFocusEffect(
    useCallback(() => {
      emitUserOnline()
      setLoading(true)
    }, [userInfo.uid]),
  )

  React.useEffect(() => {
    const getUserDetailsData = async () => {
      if (activeUsers && activeUsers.length > 0) {
        const tempActiveUsers = activeUsers.filter(uid => uid !== userInfo.uid)

        const updatedData = await Promise.all(
          tempActiveUsers.map(async uid => {
            try {
              const doc = await firestore().collection('users').doc(uid).get()
              if (doc.exists()) {
                return { ...doc.data(), uid }
              }
            } catch (error) {
              console.warn(`Failed to fetch data for ${uid}`, error)
              return null
            }
          }),
        )

        const filteredData = updatedData.filter(Boolean)
        console.log('updatedData =>', filteredData)
        setUserDetailsData(filteredData)
        setLoading(true)
      } else {
        setUserDetailsData([])
        setLoading(true)
      }
    }

    getUserDetailsData()
  }, [activeUsers])

  return (
    <HomeLayout noScroll showHeader={false}>
      <View
        style={{
          width: Dim.width,
          height: Dim.height * 0.1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppText
          styles={{
            fontSize: 20,
            fontFamily: 'Poppins-Regular',
          }}>
          Active Users
        </AppText>
      </View>

      {loading ? (
        userDetailsData.length == 0 ? (
          <View style={{ width: Dim.width, alignItems: 'center' }}>
            <AppText>No active users</AppText>
          </View>
        ) : (
          <FlatList
            data={userDetailsData}
            renderItem={({ item, index }) => {
              if (item != null) {
                return (
                  <ActiveUserComponent
                    key={index}
                    username={item.name}
                    email={item.email}
                    uid={item.uid}
                  />
                )
              } else {
                return null
              }
            }}
            contentContainerStyle={{}}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 20 }} />
            }}
          />
        )
      ) : (
        <ActivityIndicator size="large" color={Colors.white} />
      )}
    </HomeLayout>
  )
}
