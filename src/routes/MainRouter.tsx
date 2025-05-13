import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeRouter } from '@routes/HomeRouter'
import ChatListScreen from '@screens/ChatlistScreen'
import Home from '@screens/Home'
import MessagingScreen from '@screens/MessagingScreen'

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
      <Stack.Screen name="chatlist" component={ChatListScreen} />
      <Stack.Screen name="chat_details" component={MessagingScreen} />
    </Stack.Navigator>
  )
}
