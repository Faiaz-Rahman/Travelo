import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
} from 'react-native'

import { Colors, Dim } from '@constants'

import AppText from '@components/common/Text'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { HomeLayoutProps } from 'src/interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import { useNavigation } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useContext } from 'react'
import { SocketContext } from '../socket/SocketContext'
import HStack from '@components/common/HStack'

export default function HomeLayout({
  children,
  noScroll = true,
  showHeader = true,
  backHeader = false,
  username,
  active = false,
  headerTitle,
}: HomeLayoutProps) {
  const { userInfo } = useSelector((state: RootState) => state.auth)
  const navigation = useNavigation()

  const { connectSocket } = useContext(SocketContext)
  const { isConnected } = useContext(SocketContext)

  const socketEvent = () => {
    connectSocket()
  }

  React.useEffect(() => {
    socketEvent()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkBlack }}>
      {/* Header */}
      {showHeader && (
        <View style={styles.header}>
          <AppText styles={styles.greetText}>
            Greetings, {userInfo.email}
          </AppText>

          <TouchableOpacity
            style={styles.headerIconWrapper}
            onPress={() => {
              // console.log('notifications')
              navigation.navigate('active_users_list' as never)
            }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              color={Colors.white}
            />
            <View
              style={[
                styles.badge,
                { backgroundColor: isConnected ? 'green' : Colors.socialPink },
              ]}
            />
          </TouchableOpacity>
        </View>
      )}

      {backHeader && username && (
        <View style={styles.backHeaderWrapper}>
          <Pressable
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack()
              }
            }}>
            <Ionicons name="chevron-back" size={25} color={Colors.white} />
          </Pressable>
          <Image
            source={require('@assets/images/user1.png')}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              marginLeft: 10,
            }}
          />

          <AppText
            styles={{
              fontSize: 16,
              fontFamily: 'Roboto-SemiBold',
              marginLeft: 10,
            }}>
            {username}
          </AppText>
        </View>
      )}

      {headerTitle && (
        <HStack
          style={{
            paddingTop: 50,
            // backgroundColor: 'red',
            paddingLeft: Dim.width * 0.075,
            paddingRight: Dim.width * 0.075,
          }}>
          <AppText
            styles={{
              fontFamily: 'Roboto-Bold',
              fontSize: 18,
            }}>
            {headerTitle}
          </AppText>
        </HStack>
      )}

      {!noScroll ? (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Dim.height * 0.1,
          }}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    width: Dim.standardWidth,
    alignSelf: 'center',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIconWrapper: {
    height: 32,
    width: 32,
    borderColor: Colors.darkGray,
    borderRadius: 32,
    borderWidth: 1,
    backgroundColor: Colors.darkBlack,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    height: 7,
    width: 7,
    backgroundColor: Colors.socialPink,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    top: 7,
    right: 5,
  },
  greetText: {
    fontSize: 17,
    fontFamily: 'Roboto-SemiBold',
    color: Colors.white,
  },
  backHeaderWrapper: {
    height: Dim.height * 0.07,
    paddingTop: 30,
    flexDirection: 'row',
    paddingLeft: Dim.width * 0.075,
    alignItems: 'center',
  },
})
