import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput as RNTextInput,
  TextStyle,
} from 'react-native'

import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

import { Colors } from '@constants'

interface AppTextInputProps {
  style?: TextStyle
  placeholder: string
  placeholderTextColor: string
  onFocus: () => void
  onBlur: () => void
  onChangeText: (text: string) => void
  children?: React.ReactNode
  useGradient?: boolean
}

export default function TextInput({
  style,
  placeholder,
  placeholderTextColor,
  onFocus,
  onBlur,
  onChangeText,
  children,
  useGradient = true,
}: AppTextInputProps) {
  return (
    <View style={[styles.inputWrapper, style]}>
      <RNTextInput
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <TouchableOpacity style={[styles.gradient]} onPress={onBlur}>
        {useGradient ? (
          <LinearGradient
            colors={Colors.gradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 0.25, 0.6]}
            style={styles.textInputIconWrapperGradient}>
            {children}
          </LinearGradient>
        ) : (
          children
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '90%',
    backgroundColor: Colors.darkGray,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '85%',
    paddingLeft: 20,
    fontSize: 12,
    color: Colors.socialWhite,
    fontFamily: 'Roboto-Medium',
    // backgroundColor: 'red',
  },
  gradient: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },
  textInputIconWrapperGradient: {
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
})
