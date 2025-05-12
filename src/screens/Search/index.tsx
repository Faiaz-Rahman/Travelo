import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import SearchLayout from '@layouts/SearchLayout'
import { Dim } from '@constants'

import AppText from '@components/common/Text'

import Post from '@components/common/Post'

export default function Search() {
  const [selectedPopularCategory, setSelectedPopularCategory] = useState<any>({
    _id: 1,
    title: 'All',
  })

  return (
    <SearchLayout noScroll={false}>
      <View>
        <View
          style={{
            width: Dim.standardWidth,
            alignSelf: 'center',
          }}>
          <AppText styles={styles.heading}>Popular</AppText>

          <View>
            <FlatList
              data={[1, 2, 3, 4]}
              keyExtractor={item => item.toString()}
              contentContainerStyle={{
                paddingBottom: Dim.height * 0.1,
              }}
              renderItem={({ item, index }) => {
                return <Post key={`post_${index}`} />
              }}
            />
          </View>
        </View>
      </View>
    </SearchLayout>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
})
