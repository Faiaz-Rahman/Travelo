import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { Colors, Dim, dummyData } from '@constants'

import HomeLayout from '@layouts/HomeLayout'
import Post from '@components/common/Post'

export default function Home() {
  // const navigation = useNavigation()

  return (
    <HomeLayout noScroll={false}>
      <View style={styles.home}>
        {/* story */}
        {/* <FlatList
          data={dummyData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <View></View>
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
        /> */}
        <View style={styles.postWrapper} />

        <Post />
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
})
