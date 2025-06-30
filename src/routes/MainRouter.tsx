import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeRouter } from '@routes/HomeRouter'
import ActiveUsersList from '@screens/ActiveUsersList'

import MessagingScreen from '@screens/MessagingScreen'
import StoryScreen from '@screens/Story'

export type RootStackParamList = {
  home_tab: undefined
  active_users_list: undefined
  chat_details: {
    otherUser: {
      id: string
      name: string
    }
  }
  story: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="home_tab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home_tab" component={HomeRouter} />
      <Stack.Screen name="chat_details" component={MessagingScreen} />
      <Stack.Screen name="active_users_list" component={ActiveUsersList} />
      <Stack.Screen name="story" component={StoryScreen} />
    </Stack.Navigator>
  )
}
