import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  useColorScheme,
} from 'react-native'
import React, { useState } from 'react'
import { Colors, Dim } from '@constants'
import TextInput from '@components/common/AppTextInput'

import AntDesign from 'react-native-vector-icons/AntDesign'
import { SearchLayoutProps } from 'src/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/index'

export default function SearchLayout({
  children,
  noScroll = true,
}: SearchLayoutProps) {
  const [searchText, setSearchText] = useState<string>('')

  const { userTheme } = useSelector((state: RootState) => state.auth)

  return (
    <View
      style={{
        flex: 1,
        width: Dim.width,
        backgroundColor: userTheme == 'light' ? Colors.white : Colors.darkBlack,
        paddingTop: 50,
      }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.darkBlack}
        translucent
      />

      <View style={styles.searchBarWrapper}>
        <TextInput
          useGradient={false}
          style={{
            // width: Dim.width * 0.9,
            // backgroundColor: 'red',
            width: Dim.width * 0.8,
            backgroundColor:
              userTheme == 'light' ? Colors.white : Colors.darkBlack,
            borderColor: userTheme == 'light' ? Colors.darkBlack : Colors.white,
            borderWidth: 2,
          }}
          cursorColor={Colors.socialPink}
          placeholder="Search for people, posts, tags ..."
          onFocus={() => {}}
          onBlur={() => {}}
          onChangeText={(text: string) => setSearchText(text)}
          placeholderTextColor={
            userTheme == 'light' ? Colors.lighterGray : Colors.socialWhite
          }>
          <AntDesign
            name="search1"
            size={15}
            color={userTheme == 'light' ? Colors.darkGray : Colors.white}
          />
        </TextInput>
      </View>

      {!noScroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchBarWrapper: { width: Dim.width, justifyContent: 'center' },
})
