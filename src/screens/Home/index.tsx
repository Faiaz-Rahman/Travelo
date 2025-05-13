import { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'

import { Colors, Dim } from '@constants'

import HomeLayout from '@layouts/HomeLayout'
import Post from '@components/common/Post'

import firestore from '@react-native-firebase/firestore'

import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

interface PostType {
  title: string
  image: string
  createdAt: string
  username: string
}

export default function Home() {
  // const { userInfo } = useSelector((state: RootState) => state.auth)

  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

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
    getPosts()
  }, [])

  return (
    <HomeLayout noScroll>
      <View style={styles.home}>
        <View style={styles.postWrapper} />

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
    paddingLeft: Dim.width * 0.06,
    paddingRight: 30,
    paddingBottom: Dim.height * 0.2,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
})
