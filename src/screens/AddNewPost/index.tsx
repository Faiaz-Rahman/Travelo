import { useState } from 'react'

import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native'

import HomeLayout from '@layouts/HomeLayout'
import { Colors, Dim } from '@constants'

import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AppText from '@components/common/Text'
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

export default function AddNewPost() {
  const [loading, setLoading] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<any>(null)

  const { userInfo } = useSelector((state: RootState) => state.auth)

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

  return (
    <HomeLayout noScroll={false} showHeader={false}>
      <View style={styles.addNewPost}>
        <AppText styles={{ fontSize: 20, fontFamily: 'Poppins-Light' }}>
          Share your stories ...
        </AppText>

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
              <View style={styles.innerWrapper}>
                {selectedImage?.uri ? (
                  <Image
                    source={{ uri: selectedImage.uri }}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons
                    name="images-outline"
                    size={40}
                    style={{ color: Colors.white }}
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
    backgroundColor: Colors.darkBlack,
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
