import { useState } from 'react'
import { Pressable, StyleSheet, ToastAndroid, View } from 'react-native'

import AppText from '@components/common/Text'
import Button from '@components/ui/Button'
import TextInput from '@components/ui/TextInputField'

import AuthLayout from '@layouts/AuthLayout'
import { useNavigation } from '@react-navigation/native'

import { useFormik } from 'formik'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { SignUpValidationSchema } from '../../../src/schema'
import { useAppDispatch } from '@store/index'
import { signup, updateUserInfo } from '@store/slices/authSlice'

import firebase from '@react-native-firebase/firestore'

export default function Signup() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const signupForm = useFormik({
    initialValues: {
      email: '',
      pass: '',
      confPass: '',
      name: '',
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: values => {
      onPressSignUp(values.name, values.email, values.pass)
    },
  })

  const onPressSignUp = async (name: string, email: string, pass: string) => {
    setLoading(true)

    try {
      dispatch(signup({ name, email, pass }))
        .unwrap()
        .then(userData => {
          firebase().collection('users').doc(userData?.uid).set({
            name,
            email,
            createdAt: new Date().toDateString(),
            fcm: '',
          })

          if (userData) {
            dispatch(
              updateUserInfo({
                displayName: userData?.displayName,
                email: userData?.email,
                photoUrl: userData?.photoURL,
                uid: userData?.uid,
              }),
            )
          }

          setLoading(false)
        })
    } catch (error) {
      if (error instanceof Error) {
        console.log('the issue is =>', error.message)

        ToastAndroid.showWithGravity(error.message, 1500, 10)
      }
    }
  }

  return (
    <AuthLayout noScroll={false}>
      <AppText styles={styles.signupText}>
        Sign up now to{'\n'} get started!
      </AppText>

      <TextInput
        icon={<Ionicons name="text" size={20} color={'#fff'} />}
        placeholder="name (john doe)"
        onChangeText={text => {
          signupForm.setFieldValue('name', text)
        }}
        errorMessage={signupForm.errors.name}
      />

      <TextInput
        icon={<Ionicons name="mail" size={20} color={'#fff'} />}
        placeholder="email (example@example.com)"
        onChangeText={text => {
          signupForm.setFieldValue('email', text)
        }}
        errorMessage={signupForm.errors.email}
        keyboardType="email-address"
      />

      <TextInput
        icon={<Ionicons name="key" size={20} color={'#fff'} />}
        placeholder="password ... "
        isPassword
        onChangeText={text => {
          signupForm.setFieldValue('pass', text)
        }}
        errorMessage={signupForm.errors.pass}
      />

      <TextInput
        icon={<Ionicons name="key" size={20} color={'#fff'} />}
        placeholder="confirm password ... "
        isPassword
        onChangeText={text => {
          signupForm.setFieldValue('confPass', text)
        }}
        errorMessage={signupForm.errors.confPass}
      />

      <Button
        onPress={() => {
          signupForm.handleSubmit()
        }}
        title="Sign up"
        loading={loading}
        disabled={loading}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginTop: 10,
        }}>
        <AppText>Already have an account?</AppText>
        <Pressable
          onPress={() => {
            navigation.navigate('login' as never)
          }}>
          <AppText
            styles={{
              textDecorationLine: 'underline',
            }}>
            Log in
          </AppText>
        </Pressable>
      </View>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  signupText: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Roboto-Light',
    lineHeight: 45,
    marginBottom: 40,
  },
})
