import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Dim } from '@constants'
import TextInput from '@components/common/AppTextInput'

import AntDesign from 'react-native-vector-icons/AntDesign'
import { SearchLayoutProps } from 'src/interfaces'

export default function SearchLayout({
  children,
  noScroll = true,
}: SearchLayoutProps) {
  const [searchText, setSearchText] = useState<string>('')

  //   useEffect(() => {
  //     console.log(searchText);
  //   }, [searchText]);

  return (
    <View
      style={{
        flex: 1,
        width: Dim.width,
        backgroundColor: Colors.darkBlack,
      }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.darkBlack}
      />

      <View style={styles.searchBarWrapper}>
        <TextInput
          useGradient={false}
          style={
            {
              // width: Dim.width * 0.9,
            }
          }
          placeholder="Search for people, posts, tags ..."
          onFocus={() => {}}
          onBlur={() => {}}
          onChangeText={(text: string) => setSearchText(text)}
          placeholderTextColor={Colors.socialWhite}>
          <AntDesign name="search1" size={15} color={Colors.lighterGray} />
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
  searchBarWrapper: {
    height: 70,
    // backgroundColor: 'green',
    width: Dim.width,
    justifyContent: 'center',
  },
})
