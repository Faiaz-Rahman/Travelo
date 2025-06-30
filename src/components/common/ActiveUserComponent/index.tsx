import { Text, Pressable, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors, Dim } from '@constants'
import AppText from '../Text'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { RootState } from '@store/index'
import { useSelector } from 'react-redux'

interface ActiveUserComponentProps {
  username: string
  email?: string
  uid?: string
}

export default function ActiveUserComponent({
  username,
  email = '',
  uid = '',
}: ActiveUserComponentProps) {
  const navigation = useNavigation()
  const { userTheme } = useSelector((state: RootState) => state.auth)

  const moveToDetails = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'chat_details',
        params: {
          otherUser: {
            id: uid,
            name: username,
          },
        },
      }),
    )
  }

  return (
    <Pressable
      style={[
        styles.activeUserWrapper,
        { borderColor: userTheme == 'dark' ? Colors.white : Colors.darkBlack },
      ]}
      onPress={() => {
        moveToDetails()
      }}>
      <View style={{ position: 'relative' }}>
        <Image
          style={{
            height: Dim.height * 0.07,
            width: Dim.height * 0.07,
            borderRadius: 100,
          }}
          source={require('@assets/images/user1.png')}
        />
        <View style={styles.activeStatusWrapper} />
      </View>
      <AppText>{username}</AppText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  activeUserWrapper: {
    height: Dim.height * 0.1,
    width: Dim.width * 0.85,
    // backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    gap: 10,
  },
  activeStatusWrapper: {
    height: 15,
    width: 15,
    backgroundColor: 'green',
    position: 'absolute',
    borderRadius: 10,
    right: 0,
    bottom: 0,
  },
})
