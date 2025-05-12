import React from 'react'

import { View, Text, TextStyle } from 'react-native'

interface AppText {
  children: React.ReactNode
  styles?: TextStyle
}

const defaultStyles = {
  fontSize: 14,
  fontFamily: 'Poppins-Regular',
  color: '#fff',
}

export default function AppText({ children, styles }: AppText) {
  return <Text style={[defaultStyles, styles]}>{children}</Text>
}
