import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'

import { useState } from 'react'
import { Colors, Dim } from '@constants'

import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import AppText from '@components/common/Text'
import { useInteractionManager } from '@hooks/useInteractionManager'

export default function Post() {
  const {
    isLiked,
    isBookmarked,
    showComments,
    updateIsBookmarked,
    updateIsLiked,
    updateShowComments,
  } = useInteractionManager()

  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleIndex = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = nativeEvent.contentOffset
    // console.log(Math.floor(offset.x / Dim.width))

    const index = Math.ceil(offset.x / Dim.width)
    // console.log(index, offset.x);
    setActiveIndex(index)
  }

  return (
    <View style={styles.post}>
      {/* post header */}
      <View style={styles.postHeader}>
        <View style={styles.userDetailsWrapper}>
          <Image
            source={require('@assets/images/user1.png')}
            style={styles.userImage}
            resizeMode="contain"
          />
          <View>
            <AppText styles={styles.userName}>Jacob Washington</AppText>
            <AppText styles={styles.timestamp}>20m ago</AppText>
          </View>
        </View>

        <TouchableOpacity style={styles.menuWrapper} onPress={() => {}}>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={Colors.lighterGray}
          />
        </TouchableOpacity>
      </View>

      {/* post image  */}
      <FlatList
        data={[1, 2]}
        horizontal
        snapToAlignment="center"
        decelerationRate={0}
        disableIntervalMomentum={true}
        snapToInterval={Dim.width}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          height: 200,
          paddingLeft: Dim.width * 0.075,
          paddingRight: Dim.width * 0.075,
        }}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 200, width: 15 }} />
        }}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          handleIndex(e)
        }
        renderItem={({ item, index }) => {
          return (
            <TouchableHighlight
              style={styles.postImageWrapper}
              underlayColor={'rgba(0,0,0,0.6)'}
              onPress={() => {
                // console.log('next ...');
              }}>
              <Image
                source={require(`../../../assets/images/post1.png`)}
                style={styles.postImage}
                resizeMode="cover"
              />
            </TouchableHighlight>
          )
        }}
      />

      <View style={styles.thumbWrapper}>
        {[1, 2].map((item, ind) => {
          return (
            <View
              key={ind}
              style={[
                styles.thumb,
                {
                  backgroundColor:
                    ind === activeIndex
                      ? Colors.socialPink
                      : Colors.lighterGray,
                },
              ]}
            />
          )
        })}
      </View>

      <View style={styles.textWrapper}>
        <AppText styles={styles.postText}>
          “If you think you are too small to make a difference, try sleeping
          with a mosquito.” ~ Dalai Lama
        </AppText>
      </View>

      {/* interaction wrapper */}
      <View style={styles.interactionWrapper}>
        <View style={styles.iconContainersWrapperLeft}>
          {/* is liked? */}
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              updateIsLiked(!isLiked)
            }}>
            <MaterialCommunityIcons
              name={isLiked ? 'thumb-up' : 'thumb-up-outline'}
              size={16}
              color={Colors.white}
            />
          </TouchableOpacity>
          <AppText styles={styles.interactionText}>2,245</AppText>

          {/* comments */}
          <TouchableOpacity
            style={[styles.iconWrapper, { marginLeft: 20 }]}
            onPress={() => {
              updateShowComments(!showComments)
            }}>
            <MaterialCommunityIcons
              name="message-outline"
              size={16}
              color={Colors.white}
            />
          </TouchableOpacity>
          <AppText styles={styles.interactionText}>45</AppText>
        </View>

        {/* bookmark */}
        <View style={styles.iconContainersWrapperLeft}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              updateIsBookmarked(!isBookmarked)
            }}>
            <MaterialCommunityIcons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={16}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  post: {
    width: Dim.width,
    alignSelf: 'center',
    marginTop: 20,
  },
  postHeader: {
    height: 45,
    width: '100%',
    paddingLeft: Dim.width * 0.075,
    paddingRight: Dim.width * 0.075,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 8,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
    color: Colors.lighterGray,
  },
  menuWrapper: {
    height: 34,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 34,
  },
  textWrapper: {
    marginTop: 16,
    paddingLeft: Dim.width * 0.075,
    paddingRight: Dim.width * 0.075,
  },
  postText: {
    lineHeight: 25,
  },
  interactionWrapper: {
    height: 20,
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Dim.width * 0.075,
    paddingRight: Dim.width * 0.075,
  },
  iconWrapper: {
    height: 20,
    width: 25,
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconContainersWrapperLeft: {
    flexDirection: 'row',
  },
  interactionText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  postImageWrapper: {
    height: 180,
    width: Dim.width * 0.85,
    overflow: 'hidden',
    borderRadius: 15,
    marginTop: 16,
  },
  postImage: {
    height: '100%',
    width: Dim.width * 0.85,
  },
  thumbWrapper: {
    height: Dim.height * 0.02,
    width: Dim.width * 0.1,
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 7,
  },
  thumb: {
    height: 6,
    width: 6,
    backgroundColor: Colors.lighterGray,
    borderRadius: 10,
  },
})
