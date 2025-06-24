import { useState } from 'react'

import {
  View,
  StyleSheet,
  TextInput as TextInputRN,
  Pressable,
} from 'react-native'

import { Colors, Dim } from '@constants'

import Ionicons from 'react-native-vector-icons/Ionicons'
import AppText from '@components/common/Text'

import { ViewStyle } from 'react-native'

interface TextInputField {
  icon: React.ReactNode
  isPassword?: boolean
  placeholder: string
  onChangeText: (text: string) => void
  errorMessage?: string
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url'
  outerWrapper?: ViewStyle
  innerWrapper?: ViewStyle
}

export default function TextInput({
  icon,
  isPassword = false,
  placeholder,
  onChangeText,
  errorMessage,
  keyboardType,
  outerWrapper,
  innerWrapper,
}: TextInputField) {
  const [selected, setSelected] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <View style={outerWrapper}>
      <View
        style={[
          styles.textInputWrapper,
          {
            borderBottomColor: selected ? Colors.socialPink : '#fff',
            ...innerWrapper,
          },
        ]}>
        <View style={styles.iconWrapper}>{icon}</View>

        <TextInputRN
          cursorColor={Colors.socialPink}
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={isPassword ? (showPassword ? false : true) : false}
          placeholderTextColor={'#b1aaaa'}
          onBlur={() => {
            setSelected(false)
          }}
          onFocus={() => {
            setSelected(true)
          }}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />

        {isPassword && (
          <Pressable
            style={styles.eyeWrapper}
            onPress={() => {
              setShowPassword(prev => !prev)
            }}>
            {showPassword ? (
              <Ionicons name="eye-off" color={Colors.socialPink} size={20} />
            ) : (
              <Ionicons name="eye" color={'#fff'} size={20} />
            )}
          </Pressable>
        )}
      </View>
      <View style={styles.errorWrapper}>
        {errorMessage ? (
          <>
            <Ionicons
              name="warning-outline"
              color={Colors.socialPink}
              size={15}
            />
            <AppText styles={styles.errorMessageTextStyle}>
              {errorMessage}
            </AppText>
          </>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInputWrapper: {
    height: 60,
    width: Dim.width * 0.8,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  iconWrapper: {
    height: 60,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeWrapper: {
    height: 60,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: '100%',
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: Colors.white,
  },
  errorWrapper: {
    height: 20,
    width: Dim.width * 0.85,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  errorMessageTextStyle: {
    marginTop: 2,
    fontSize: 11,
    fontFamily: 'Poppins-Light',
  },
})
