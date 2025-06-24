// import { useState } from 'react'
import { useState } from 'react'
import { Pressable, ToastAndroid, View } from 'react-native'

import AppText from '@components/common/Text'
import Button from '@components/ui/Button'
import TextInput from '@components/ui/TextInputField'
import AuthLayout from '@layouts/AuthLayout'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'

import { validationSchemaForLogin } from '../../../src/schema'
import { useAppDispatch } from '@store/index'
import { login, updateUsername, updateUserSince } from '@store/slices/authSlice'

import firestore from '@react-native-firebase/firestore'
import { useDispatch } from 'react-redux'

export default function Login() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const dispatchAction = useDispatch()

  const loginForm = useFormik({
    initialValues: {
      email: '',
      pass: '',
    },
    validationSchema: validationSchemaForLogin,
    onSubmit: values => {
      onPressLogin()
    },
  })

  const onPressLogin = async () => {
    setLoading(true)
    try {
      await dispatch(
        login({
          email: loginForm.values.email,
          password: loginForm.values.pass,
        }),
      )
        .unwrap()
        .then(async val => {
          const userData = await firestore()
            .collection('users')
            .doc(val.uid)
            .get()

          if (userData.data()) {
            dispatchAction(updateUsername(userData.data()?.name))
            dispatchAction(updateUserSince(userData.data()?.createdAt))
          }

          setTimeout(() => {
            setLoading(false)
          }, 2500)
        })
    } catch (error: any) {
      ToastAndroid.showWithGravity(error, 1500, 10)
      setLoading(false)
    }
  }

  return (
    <AuthLayout noScroll={false}>
      <AppText
        styles={{
          fontSize: 30,
          fontFamily: 'Roboto-Bold',
        }}>
        Team ভালো থাকা
      </AppText>

      <AppText styles={{ marginBottom: 50 }}>
        সবার আগে নিজেকে ভালোবাসতে শিখুন
      </AppText>

      <TextInput
        icon={<Ionicons name="mail" size={20} color={'#fff'} />}
        placeholder="example@example.com"
        onChangeText={text => {
          loginForm.setFieldValue('email', text)
        }}
        errorMessage={loginForm.errors.email}
      />

      <TextInput
        icon={<Ionicons name="key" size={20} color={'#fff'} />}
        placeholder="Password ... "
        isPassword
        onChangeText={text => {
          //   setPassword(text)
          loginForm.setFieldValue('pass', text)
        }}
        errorMessage={loginForm.errors.pass}
      />

      <Button
        onPress={() => {
          loginForm.handleSubmit()
        }}
        title="Log in"
        disabled={loading}
        loading={loading}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
        <AppText>Don't have an account?</AppText>
        <Pressable
          onPress={() => {
            navigation.navigate('signup' as never)
          }}>
          <AppText
            styles={{
              textDecorationLine: 'underline',
            }}>
            Sign up
          </AppText>
        </Pressable>
      </View>
    </AuthLayout>
  )
}
