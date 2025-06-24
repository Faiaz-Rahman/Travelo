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
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

interface AutoGrowTextInput {
  minHeight?: number
  onChangeText: (text: string) => void
}

export default function AutoGrowTextInput({
  minHeight = 40,
  onChangeText,
}: AutoGrowTextInput) {
  const [inputHeight, setInputHeight] = useState<number>(minHeight)

  const { userTheme } = useSelector((state: RootState) => state.auth)

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
        style={[
          styles.textInput,
          {
            height: inputHeight,
            color: userTheme == 'dark' ? Colors.white : Colors.darkBlack,
          },
        ]}
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

    height: 40,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
})
