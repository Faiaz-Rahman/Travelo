import React, { useEffect, useState } from 'react'

import HomeLayout from '@layouts/HomeLayout'
import AppText from '@components/common/Text'
import { ActivityIndicator, FlatList, StatusBar, View } from 'react-native'
import { Colors, Dim } from '@constants'

import ActiveUserComponent from '@components/common/ActiveUserComponent'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'

import { useSocket } from '../../socket/SocketContext'

import firestore from '@react-native-firebase/firestore'

interface FBUserQueryData {
  createdAt: string
  email: string
  fcm: string
  name: string
  uid?: string
}

export default function ActiveUsersList() {
  const { userInfo, userTheme } = useSelector((state: RootState) => state.auth)

  const [userDetailsData, setUserDetailsData] = useState<
    Array<FBUserQueryData>
  >([])
  const [loading, setLoading] = useState<boolean>(true)

  const { activeUsers } = useSocket()

  const getUserDetailsData = async () => {
    if (activeUsers && activeUsers.length > 0) {
      const activeUsersWithoutMe = activeUsers.filter(
        user => user != userInfo.uid,
      )

      const updatedData = await Promise.all(
        activeUsersWithoutMe.map(async uid => {
          try {
            const userDataFromFb = await firestore()
              .collection('users')
              .doc(uid)
              .get()

            if (userDataFromFb.exists()) {
              return { ...userDataFromFb.data(), uid }
            }
          } catch (error) {
            console.error(`failed to fetch data for $${uid}: `, error)
            return []
          }
        }),
      )

      if (updatedData.length) {
        setUserDetailsData(updatedData as never[])
      }
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getUserDetailsData()
  }, [activeUsers])

  return (
    <HomeLayout noScroll showHeader={false} headerTitle="Active Users">
      {!loading ? (
        userDetailsData.length == 0 ? (
          <View
            style={{ width: Dim.width, alignItems: 'center', paddingTop: 20 }}>
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
            contentContainerStyle={{
              paddingTop: 20,
            }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 20 }} />
            }}
          />
        )
      ) : (
        <View
          style={{
            paddingTop: 30,
          }}>
          <ActivityIndicator
            size="large"
            color={userTheme == 'dark' ? Colors.white : Colors.darkBlack}
          />
        </View>
      )}
    </HomeLayout>
  )
}
