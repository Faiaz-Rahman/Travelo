import { useEffect, useState } from 'react'

import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
} from 'react-native'

import HomeLayout from '@layouts/HomeLayout'
import { Colors, Dim } from '@constants'

import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AutoGrowTextInput from '@components/ui/AutoGrowTextInput'
import Button from '@components/ui/Button'

import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker'

import firebase from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { supabase } from '@utils/supabase'

import ReactNativeBlobUtil from 'react-native-blob-util'
import { Buffer } from 'buffer'

import Geolocation from 'react-native-geolocation-service'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

export default function AddNewPost() {
  const [loading, setLoading] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  const { userInfo, username, userTheme } = useSelector(
    (state: RootState) => state.auth,
  )

  const onSelectImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    }

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return
      }

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image')
        return
      }

      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0])
      }
    })
  }

  const uploadImage = async () => {
    if (!selectedImage?.uri) {
      Alert.alert('No image selected')
      return
    }
    try {
      setLoading(true)

      const ext = selectedImage.fileName?.split('.').pop() || 'jpg'

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const fileName = `post-${timestamp}.${ext}`

      const fileVal = await ReactNativeBlobUtil.fs.readFile(
        selectedImage?.uri.replace('file:///', ''),
        'base64',
      )
      const binary = Buffer.from(fileVal, 'base64')

      const { error, data } = await supabase.storage
        .from('travelo')
        .upload(fileName, binary, {
          upsert: false,
          contentType: 'image/jpeg',
        })

      if (error) {
        ToastAndroid.showWithGravity(`${error.message}`, 1500, 10)
      } else {
        const publicURL = supabase.storage
          .from('travelo')
          .getPublicUrl(fileName).data.publicUrl

        const postsInFB = await firebase()
          .collection('posts')
          .doc(userInfo.uid)
          .get()

        if (postsInFB.exists()) {
          let existingData: any = postsInFB.data()?.posts

          await firebase()
            .collection('posts')
            .doc(userInfo.uid)
            .set({
              posts: [
                {
                  postText: text,
                  createdAt: new Date().toDateString(),
                  image: publicURL,
                  username,
                },
                ...existingData,
              ],
            })
        } else {
          await firebase()
            .collection('posts')
            .doc(userInfo.uid)
            .set({
              posts: [
                {
                  postText: text,
                  createdAt: new Date().toDateString(),
                  image: publicURL,
                  username,
                },
              ],
            })
        }

        ToastAndroid.showWithGravity('Post Uploaded!', 1500, 10)
      }
    } catch (err) {
      if (err instanceof Error) {
        ToastAndroid.showWithGravity(`Error: ${err.message}`, 1500, 10)
      }
    } finally {
      setLoading(false)
    }
  }

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') return true

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
    return granted === PermissionsAndroid.RESULTS.GRANTED
  }

  const getLocation = async () => {
    const permission = await hasLocationPermission()
    if (!permission) return

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      error => {
        console.error('Location error:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    )
  }

  useEffect(() => {
    // getLocation()
  }, [])

  return (
    <HomeLayout
      noScroll={false}
      showHeader={false}
      headerTitle="Share with Team ভালো থাকা">
      <View style={styles.addNewPost}>
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'flex-end' }}>
          <Pressable
            style={styles.selectImageWrapper}
            onPress={() => {
              onSelectImage()
            }}>
            <LinearGradient
              colors={Colors.gradient}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.25, 0.6]}
              style={styles.gradient}>
              <View
                style={[
                  styles.innerWrapper,
                  {
                    backgroundColor:
                      userTheme == 'dark' ? Colors.darkBlack : Colors.white,
                  },
                ]}>
                {selectedImage?.uri ? (
                  <Image
                    source={{ uri: selectedImage.uri }}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons
                    name="images-outline"
                    size={30}
                    style={{
                      color:
                        userTheme == 'dark' ? Colors.white : Colors.darkBlack,
                    }}
                  />
                )}
              </View>
            </LinearGradient>
          </Pressable>

          {selectedImage?.uri && (
            <Pressable
              style={styles.deleteWrapper}
              onPress={() => {
                setSelectedImage(null)
              }}>
              <Ionicons
                name="trash"
                size={25}
                style={{ color: Colors.white }}
              />
            </Pressable>
          )}
        </View>

        <AutoGrowTextInput
          onChangeText={text => {
            setText(text)
          }}
        />
        {location && (
          <>
            <MapView
              style={StyleSheet.absoluteFillObject}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
              <Marker
                coordinate={location}
                title="You are here"
                description={`Lat: ${location.latitude}, Lng: ${location.longitude}`}
              />
            </MapView>
          </>
        )}

        <Button
          title="Upload"
          onPress={() => {
            if (selectedImage) {
              uploadImage()
            }
          }}
          style={{
            width: Dim.width * 0.5,
          }}
          loading={loading}
          disabled={loading}
        />
      </View>
    </HomeLayout>
  )
}

const styles = StyleSheet.create({
  addNewPost: {
    paddingTop: 30,
    paddingLeft: Dim.width * 0.075,
    paddingRight: Dim.width * 0.075,
    gap: 20,
  },
  selectImageWrapper: {
    height: Dim.height * 0.3,
    width: Dim.height * 0.3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'red',
    marginTop: 10,
  },
  gradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerWrapper: {
    height: '95%',
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteWrapper: {
    backgroundColor: Colors.socialPink,
    borderRadius: 30,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
