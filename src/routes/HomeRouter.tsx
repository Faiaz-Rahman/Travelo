import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@screens/Home'

import { Image, StyleSheet, View } from 'react-native'
import { Colors, Dim } from '@constants'

import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import LinearGradient from 'react-native-linear-gradient'
import Search from '@screens/Search'
import AddNewPost from '@screens/AddNewPost'
import Profile from '@screens/Profile'
import ActiveUsersList from '@screens/ActiveUsersList'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// import Animated, {
//   Easing,
//   Extrapolation,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated'

const Tab = createBottomTabNavigator()

export const HomeRouter = (): React.JSX.Element => {
  // const sharedValue = useSharedValue(0)
  // const [addNewFocused, setAddNewFocused] = useState<boolean>(false)

  // const beatAnimation = useAnimatedStyle(() => {
  //   const scale = interpolate(
  //     sharedValue.value,
  //     [0, 10],
  //     [0, 1.1],
  //     Extrapolation.CLAMP,
  //   )

  //   return {
  //     transform: [{ scale }],
  //   }
  // })

  // const beatAnimationFunc = () => {
  //   console.log('beatAnimationFunc. was called!')

  //   sharedValue.value = withTiming(10, {
  //     duration: 200,
  //     easing: Easing.bounce,
  //   })
  // }

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
                  tintColor: color,
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
          tabBarIcon: ({ color, focused, size, ...props }) => {
            return (
              <View style={{}} onLayout={() => {}}>
                <LinearGradient
                  colors={Colors.gradient}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  locations={[0, 0.25, 0.6]}
                  style={[styles.gradient]}>
                  <Feather name="plus" size={25} color={Colors.white} />
                </LinearGradient>
              </View>
            )
          },
        }}
      />

      <Tab.Screen
        name="active_users_list"
        component={ActiveUsersList}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <MaterialCommunityIcons
                name="message-outline"
                size={20}
                color={color}
              />
            )
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

const styles = StyleSheet.create({
  gradient: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
})
