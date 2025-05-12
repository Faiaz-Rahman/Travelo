import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '@screens/Login'
import Signup from '@screens/Signup'

const AuthStack = createNativeStackNavigator()

const AuthRoute = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_left',
      }}>
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="signup" component={Signup} />
    </AuthStack.Navigator>
  )
}

export default AuthRoute
