import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@screens/Home'

import { Image, View } from 'react-native'
import { Colors, Dim } from '@constants'

import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import LinearGradient from 'react-native-linear-gradient'
import Search from '@screens/Search'
import AddNewPost from '@screens/AddNewPost'
import Profile from '@screens/Profile'
import Notification from '@screens/Notification'

const Tab = createBottomTabNavigator()

export const HomeRouter = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.lighterGray,
        tabBarStyle: {
          backgroundColor: Colors.darkBlack,
          height: Dim.height * 0.15,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Image
                source={require('../assets/images/feed.png')}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: focused ? Colors.white : Colors.lighterGray,
                }}
                resizeMode="contain"
              />
            )
          },
        }}
      />

      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return <Feather name="search" size={20} color={color} />
          },
        }}
      />

      <Tab.Screen
        name="post"
        component={AddNewPost}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <LinearGradient
                colors={Colors.gradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 0.25, 0.6]}
                style={{
                  height: 50,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}>
                <Feather name="plus" size={25} color={Colors.white} />
              </LinearGradient>
            )
          },
        }}
      />

      <Tab.Screen
        name="notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return <Feather name="bell" size={20} color={color} />
          },
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return <FontAwesome5 name="user-circle" size={20} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}
