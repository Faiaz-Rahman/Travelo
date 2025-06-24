import { View, ViewStyle } from 'react-native'

interface HStack {
  children: React.ReactNode
  style?: ViewStyle
}

export default function HStack({ children, style }: HStack) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        ...style,
      }}>
      {children}
    </View>
  )
}
