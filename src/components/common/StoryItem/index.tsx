import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'
import React from 'react'

import { Colors, Dim } from '@constants'
import LinearGradient from 'react-native-linear-gradient'

interface StoryItemProps {
  item: {
    storyImage: number
    userImage: number
  }
  onPress: () => void
}

export default function StoryItem({ item, onPress }: StoryItemProps) {
  return (
    <TouchableHighlight style={styles.storyItem} onPress={onPress}>
      <>
        <Image
          source={item.storyImage}
          style={{
            height: '100%',
            width: '100%',
          }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={Colors.gradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.25, 0.6]}
          style={styles.gradient}>
          <Image
            source={item.userImage}
            style={{
              height: 33,
              width: 33,
              borderRadius: 33,
              borderWidth: 1.5,
              borderColor: Colors.darkBlack,
            }}
            resizeMode="cover"
          />
        </LinearGradient>
      </>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  storyItem: {
    height: 140,
    width: 100,
    borderRadius: 16,
    backgroundColor: Colors.lighterGray,
    overflow: 'hidden',
    position: 'relative',
  },
  gradient: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 5,
  },
})
