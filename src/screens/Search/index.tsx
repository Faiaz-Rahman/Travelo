import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import SearchLayout from '@layouts/SearchLayout'
import { Dim } from '@constants'

import AppText from '@components/common/Text'

export default function Search() {
  return (
    <SearchLayout noScroll={false}>
      <View>
        <View
          style={{
            width: Dim.standardWidth,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText styles={styles.heading}>Nothing to show ...</AppText>
        </View>
      </View>
    </SearchLayout>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins-Light',
    marginBottom: 10,
  },
})
