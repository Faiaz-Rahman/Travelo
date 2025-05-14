import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat'
import { RouteProp, useRoute } from '@react-navigation/native'
import HomeLayout from '@layouts/HomeLayout'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

type MessagingScreenRouteProp = RouteProp<RootStackParamList, 'chat_details'>

import { RootStackParamList } from '@routes/MainRouter'
import { Colors } from '@constants'

export default function MessagingScreen() {
  const route = useRoute<MessagingScreenRouteProp>()
  const { otherUser } = route.params

  console.log(otherUser)
  const { userInfo } = useSelector((state: RootState) => state.auth)

  const [messages, setMessages] = useState<IMessage[]>([])

  const currentUser: User = {
    _id: userInfo.uid,
    name: 'Current User',
    avatar: 'https://i.pravatar.cc/300',
  }

  const chatId = [currentUser._id, otherUser.id].sort().join('_')

  console.log(chatId)

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const msgs = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            user: data.user,
          } as IMessage
        })
        setMessages(msgs)
      })

    return () => unsubscribe()
  }, [])

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    const message = newMessages[0]
    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        ...message,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
  }, [])

  return (
    <HomeLayout
      noScroll={true}
      showHeader={false}
      backHeader
      username={otherUser.name}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={currentUser}
          placeholder={`Chat with ${otherUser.name}`}
          alwaysShowSend
          showUserAvatar
          renderUsernameOnMessage
          textInputProps={{
            color: Colors.socialPink,
          }}
        />
      </View>
    </HomeLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
