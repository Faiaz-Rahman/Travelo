import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { Colors } from '@constants'
import AppText from '@components/common/Text'

const currentUserId = 'user1' // Replace with auth UID

export default function ChatListScreen() {
  const navigation = useNavigation()
  const [chatList, setChatList] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .onSnapshot(async snapshot => {
        const chatsData: any[] = []

        for (const doc of snapshot.docs) {
          const chatId = doc.id
          if (!chatId.includes(currentUserId)) continue

          const messagesSnap = await firestore()
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .limit(1)
            .get()

          const lastMessage = messagesSnap.docs[0]?.data()
          if (!lastMessage) continue

          const otherUserId = chatId
            .split('_')
            .find((id: string) => id !== currentUserId)

          const userDoc = await firestore()
            .collection('users')
            .doc(otherUserId!)
            .get()
          const otherUser = userDoc.data()

          chatsData.push({
            chatId,
            lastMessage: lastMessage.text,
            otherUser: {
              id: otherUserId,
              name: otherUser?.name,
              avatar: otherUser?.avatar,
            },
          })
        }

        setChatList(chatsData)
      })

    return () => unsubscribe()
  }, [])

  const handlePress = (item: any) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'MessagingScreen',
        params: {
          currentUserId,
          otherUser: item.otherUser,
        },
      }),
    )
  }

  return (
    <View style={styles.container}>
      {chatList.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText>No Chats</AppText>
        </View>
      ) : (
        <FlatList
          data={chatList}
          keyExtractor={item => item.chatId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatRow}
              onPress={() => handlePress(item)}>
              <Image
                source={{ uri: item.otherUser.avatar }}
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.otherUser.name}</Text>
                <Text style={styles.preview}>{item.lastMessage}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors.darkBlack,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  preview: {
    color: '#555',
    marginTop: 2,
  },
})
