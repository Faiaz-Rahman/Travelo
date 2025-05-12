import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import { Colors, Dim } from '@constants'

import AppText from '@components/common/Text'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { HomeLayoutProps } from 'src/interfaces'

export default function HomeLayout({
  children,
  noScroll = true,
}: HomeLayoutProps) {
  // console.log(Colors);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkBlack }}>
      {/* Header */}
      <View style={styles.header}>
        <AppText styles={styles.greetText}>Good Morning, Alex.</AppText>

        <TouchableOpacity
          style={styles.headerIconWrapper}
          onPress={() => {
            // console.log('notifications')
          }}>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color={Colors.white}
          />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      {!noScroll ? (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Dim.height * 0.1,
          }}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    width: Dim.standardWidth,
    alignSelf: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIconWrapper: {
    height: 32,
    width: 32,
    borderColor: Colors.darkGray,
    borderRadius: 32,
    borderWidth: 1,
    backgroundColor: Colors.darkBlack,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    height: 7,
    width: 7,
    backgroundColor: Colors.socialPink,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    top: 7,
    right: 5,
  },
  greetText: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: Colors.white,
  },
})
