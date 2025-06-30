import { View, StyleSheet } from 'react-native'
import SearchLayout from '@layouts/SearchLayout'

import { Colors, Dim } from '@constants'

import AppText from '@components/common/Text'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

export default function Search() {
  const { userTheme } = useSelector((state: RootState) => state.auth)

  return (
    <SearchLayout noScroll={false}>
      <View style={{ paddingTop: 20 }}>
        <View
          style={{
            width: Dim.standardWidth,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText
            styles={{
              color: userTheme == 'dark' ? Colors.white : Colors.darkBlack,
              ...styles.heading,
            }}>
            Nothing to show ...
          </AppText>
        </View>
      </View>
    </SearchLayout>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Poppins-Light',
    marginBottom: 10,
  },
})
