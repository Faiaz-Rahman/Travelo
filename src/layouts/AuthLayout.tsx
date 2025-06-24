import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { Colors } from '@constants'

interface AuthLayoutProps {
  children: React.ReactNode
  noScroll?: boolean
}

export default function AuthLayout({
  children,
  noScroll = true,
}: AuthLayoutProps) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkBlack }}>
      <StatusBar translucent backgroundColor="transparent" />

      {noScroll ? (
        <ImageBackground
          source={require('@assets/images/valothaka.jpg')}
          style={styles.noScrollWrapper}>
          <View style={styles.overlay}>{children}</View>
        </ImageBackground>
      ) : (
        <ImageBackground
          source={require('@assets/images/valothaka.jpg')}
          style={[styles.noScrollWrapper]}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={-50}
            contentContainerStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
            <View style={[styles.overlay]}>
              <ScrollView
                // keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                }}>
                {children}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  noScrollWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  overlay: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
})
