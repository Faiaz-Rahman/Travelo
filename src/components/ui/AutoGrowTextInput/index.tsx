import { useState } from 'react'
import {
  TextInputProps,
  TextInput,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  StyleSheet,
  View,
} from 'react-native'

import { Colors, Dim } from '@constants'

interface AutoGrowTextInput {
  minHeight?: number
  onChangeText: (text: string) => void
}

export default function AutoGrowTextInput({
  minHeight = 40,
  onChangeText,
}: AutoGrowTextInput) {
  const [inputHeight, setInputHeight] = useState<number>(minHeight)

  const handleContentSizeChange = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => {
    setInputHeight(event.nativeEvent.contentSize.height)
  }

  return (
    <View>
      <TextInput
        multiline
        onChangeText={onChangeText}
        onContentSizeChange={handleContentSizeChange}
        style={[styles.textInput, { height: inputHeight }]}
        placeholderTextColor={Colors.lighterGray}
        placeholder="add your thoughts here ..."
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.socialPink,
    width: Dim.width * 0.85,
    paddingLeft: 20,
    color: Colors.white,
    height: 40,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
})
