import { Colors } from '@constants'
import { RootState } from '@store/index'
import { Text, TextStyle } from 'react-native'
import { useSelector } from 'react-redux'

interface AppText {
  children: React.ReactNode
  styles?: TextStyle
}

export default function AppText({ children, styles }: AppText) {
  const { userTheme } = useSelector((state: RootState) => state.auth)

  const defaultStyles = {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: userTheme == 'dark' ? Colors.white : Colors.darkBlack,
  }

  return (
    <Text
      style={[
        defaultStyles,
        { color: userTheme == 'dark' ? Colors.white : Colors.darkBlack },
        styles,
      ]}>
      {children}
    </Text>
  )
}
