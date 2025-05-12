import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeRouter } from '@routes/HomeRouter'
import Home from '@screens/Home'

const Stack = createNativeStackNavigator()

export const MainRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="home_tab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home_tab" component={HomeRouter} />
      <Stack.Screen name="story" component={Home} />
    </Stack.Navigator>
  )
}
