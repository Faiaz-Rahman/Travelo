import { View, Text, ViewStyle } from 'react-native'
import React from 'react'

interface VStack {
  children: React.ReactNode
  style?: ViewStyle
}

export default function VStack({ children, style }: VStack) {
  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
        ...style,
      }}>
      {children}
    </View>
  )
}
