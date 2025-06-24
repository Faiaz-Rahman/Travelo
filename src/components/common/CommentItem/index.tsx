import { View } from 'react-native'

import AppText from '../Text'

interface CommentItem {
  username: string
  comment: string
}

export default function CommentItem({ username, comment }: CommentItem) {
  return (
    <View style={{ marginBottom: 5 }}>
      <AppText
        styles={{
          fontSize: 14,
          fontFamily: 'Roboto-Bold',
        }}>
        {username}
      </AppText>
      <AppText styles={{ fontSize: 11 }}>{comment}</AppText>
    </View>
  )
}
