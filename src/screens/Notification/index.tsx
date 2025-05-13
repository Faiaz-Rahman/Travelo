import { View, Text } from 'react-native'
import React from 'react'
import HomeLayout from '@layouts/HomeLayout'
import AppText from '@components/common/Text'

export default function Notification() {
  return (
    <HomeLayout noScroll showHeader={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AppText>No new notifications!</AppText>
      </View>
    </HomeLayout>
  )
}
