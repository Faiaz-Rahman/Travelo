import { useState, useEffect, useRef } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  AppState,
} from 'react-native'

import { Colors, Dim, dummyData } from '@constants'

import HomeLayout from '@layouts/HomeLayout'
import Post from '@components/common/Post'

import firestore from '@react-native-firebase/firestore'

import Animated from 'react-native-reanimated'
import StoryItem from '@components/common/StoryItem'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useSocket } from '../../socket/SocketContext'

interface PostType {
  title: string
  image: string
  createdAt: string
  username: string
}

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const navigation = useNavigation()
  const { emitUserOnline } = useSocket()

  const getPosts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      const snapshot = await firestore().collection('posts').get()

      let allPosts: PostType[] = []

      snapshot.forEach(doc => {
        const userData = doc.data()
        if (userData?.posts && Array.isArray(userData.posts)) {
          allPosts = [...allPosts, ...userData.posts]
        }
      })

      allPosts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

      setPosts(allPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false)
    }
  }

  useEffect(() => {
    emitUserOnline()
    getPosts()
  }, [])

  return (
    <HomeLayout noScroll>
      <View style={styles.home}>
        <View style={styles.postWrapper} />

        <View style={{}}>
          <Animated.FlatList
            data={dummyData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: people, index }) => {
              return (
                <StoryItem
                  key={index}
                  item={people}
                  onPress={() => {
                    navigation.dispatch(
                      CommonActions.navigate({
                        name: 'story',
                        params: {
                          userImage: people.userImage,
                          storyImage: people.storyImage,
                        },
                      }),
                    )
                  }}
                />
              )
            }}
            contentContainerStyle={{
              marginTop: 32,
              paddingLeft: Dim.width * 0.06,
              paddingRight: 30,
              height: 160,
            }}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    width: 12,
                    height: 140,
                  }}
                />
              )
            }}
          />
        </View>

        {loading && posts.length === 0 ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.white} />
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Post
                createdAt={item.createdAt}
                imageUrl={item.image}
                title={item.title}
                username={item.username}
              />
            )}
            contentContainerStyle={styles.flatlist}
            refreshing={refreshing}
            onRefresh={() => getPosts(true)}
          />
        )}
      </View>
    </HomeLayout>
  )
}

const styles = StyleSheet.create({
  home: {},
  postWrapper: {
    height: 1,
    width: Dim.width,
    backgroundColor: Colors.lighterGray,
  },
  flatlist: {
    paddingLeft: Dim.width * 0.075,
    paddingRight: Dim.width * 0.075,
    paddingBottom: Dim.height * 0.42,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
})
