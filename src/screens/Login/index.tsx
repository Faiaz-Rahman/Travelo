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
import { login } from '@store/slices/authSlice'

export default function Login() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()

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

  //   React.useEffect(() => {
  //     console.log(email)
  //   }, [email])
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
        .then(() => {
          setTimeout(() => {
            setLoading(false)
          }, 2500)
        })
    } catch (error: any) {
      ToastAndroid.showWithGravity(error, 1500, 10)
      // console.log('error in login =>', error);
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AppText
        styles={{
          fontSize: 50,
          fontFamily: 'Roboto-Bold',
        }}>
        Travelo
      </AppText>

      <AppText styles={{ marginBottom: 50 }}>
        Travel the world, share the journey!
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
        placeholder="password ... "
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
