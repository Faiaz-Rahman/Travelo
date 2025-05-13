import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat'
import { RouteProp, useRoute } from '@react-navigation/native'

type MessagingScreenRouteProp = RouteProp<any, 'MessagingScreen'>

export default function MessagingScreen() {
  const route = useRoute<MessagingScreenRouteProp>()
  const { currentUserId, otherUser } = route.params

  const [messages, setMessages] = useState<IMessage[]>([])

  const currentUser: User = {
    _id: currentUserId,
    name: 'Current User',
    avatar: 'https://i.pravatar.cc/300',
  }

  const chatId = [currentUserId, otherUser.id].sort().join('_')

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
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={currentUser}
        placeholder={`Chat with ${otherUser.name}`}
        alwaysShowSend
        showUserAvatar
        renderUsernameOnMessage
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
