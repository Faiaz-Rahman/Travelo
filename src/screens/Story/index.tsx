import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'

import { Colors, Dim } from '@constants'
import LinearGradient from 'react-native-linear-gradient'

import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import Feather from 'react-native-vector-icons/Feather'
import TextInput from '@components/common/AppTextInput'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

export default function StoryScreen() {
  const route: any = useRoute()
  const navigation = useNavigation()
  const [isPaused, setIsPaused] = useState<boolean | null>(null)
  const [replyToStory, setReplyToStory] = useState<string>('')
  const { userTheme } = useSelector((state: RootState) => state.auth)

  const progressValue = useSharedValue(0)

  const animatedProgressbarStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value * 100}%`,
  }))

  const startAnimation = () => {
    progressValue.value = withTiming(1, { duration: 5000 }, value => {
      console.log('the animation is finished? ==>', value)
      if (value) {
        runOnJS(setIsPaused)(false)
      }
      if (isPaused === true) {
        runOnJS(setIsPaused)(false)
      }
    })
  }

  const handlePauseAnimation = () => {
    cancelAnimation(progressValue)
    runOnJS(setIsPaused)(true)
  }

  useEffect(() => {
    if (!isPaused) {
      startAnimation()
    }
  }, [])

  useEffect(() => {
    if (isPaused === false) {
      console.log('going back')
      navigation.goBack()
    }
  }, [isPaused])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      <View
        style={[
          styles.story,
          {
            backgroundColor:
              userTheme == 'dark' ? Colors.darkBlack : Colors.white,
          },
        ]}>
        <ImageBackground
          source={route.params?.storyImage}
          style={{ flex: 1, height: '100%', width: '100%', paddingTop: 30 }}
          resizeMode="cover">
          {/* progress bar animation */}
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                {
                  height: 5,
                  backgroundColor: Colors.white,
                },
                animatedProgressbarStyle,
              ]}
            />
          </View>

          {/* user details container */}
          <View style={styles.postHeader}>
            <View style={styles.userDetailsWrapper}>
              <LinearGradient
                colors={Colors.gradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                locations={[0, 0.25, 0.6]}
                style={styles.gradient}>
                <Image
                  source={route.params?.userImage}
                  style={{
                    height: 33,
                    width: 33,
                    borderRadius: 33,
                    borderWidth: 1.5,
                    borderColor: Colors.darkBlack,
                  }}
                  resizeMode="cover"
                />
              </LinearGradient>
              <View>
                <Text style={styles.userName}>Jacob Washington</Text>
                <Text style={styles.timestamp}>20m ago</Text>
              </View>
            </View>
          </View>

          {/* reply wrapper */}
          <View style={styles.replyWrapper}>
            <TextInput
              value={replyToStory}
              onChangeText={setReplyToStory}
              onBlur={startAnimation}
              onFocus={handlePauseAnimation}
              placeholder="Type your reply here ..."
              placeholderTextColor={Colors.socialWhite}
              cursorColor={Colors.socialPink}>
              <Feather name="send" size={18} color={Colors.white} />
            </TextInput>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  story: {
    flex: 1,
  },
  postHeader: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Dim.width * 0.075,
    paddingRight: Dim.width * 0.075,
    marginTop: 10,
  },
  gradient: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },
  userImage: {
    height: 34,
    width: 34,
    borderRadius: 34,
  },
  userDetailsWrapper: {
    width: '70%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
    color: Colors.darkBlack,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
    color: Colors.darkBlack,
  },
  progressBar: {
    height: 5,
    width: Dim.width * 0.85,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: Colors.lighterGray,
    overflow: 'hidden',
  },
  inputWrapper: {
    width: '90%',
    backgroundColor: Colors.darkGray,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '85%',
    paddingLeft: 20,
    fontSize: 12,
    color: Colors.socialWhite,
    fontFamily: 'Roboto-Medium',
    // backgroundColor: 'red',
  },
  replyWrapper: {
    height: 100,
    width: Dim.width,
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 'auto',
    paddingTop: 12,
  },

  textInputIconWrapperGradient: {
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
})
