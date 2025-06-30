import { TextStyle } from 'react-native'

export interface PopularListItemProp {
  title?: string
  selected: boolean
  onPress: () => void
}

export interface SearchLayoutProps {
  noScroll?: boolean
  children: React.ReactNode
}

export interface HomeLayoutProps {
  children: React.ReactNode
  noScroll: boolean
  showHeader?: boolean
  backHeader?: boolean
  username?: string
  active?: boolean
  headerTitle?: string
}

export interface PopularListType {
  _id: number
  title: string
}

interface PostProps {
  postText: string
  likes: number
  comments: Object
  bookmarked: boolean
  image?: string
  timestamp: string
  userName: string
  userImage?: string
}

export interface UserType {
  email: string | null
  photoUrl: null | string
  displayName: string | null
  uid: string
}

export interface StateType {
  isAuthenticated: boolean
  authToken: string | null
  authLoader: boolean
  userInfo: UserType
  refreshToken: string
  fcmToken: string
  createdAt: string
  username: string
  userTheme: 'dark' | 'light' | ''
}

export interface AppTextInputProps {
  style?: TextStyle
  placeholder: string
  placeholderTextColor: string
  onFocus: () => void
  onBlur: () => void
  onChangeText: (text: string) => void
  children?: React.ReactNode
  useGradient?: boolean
  cursorColor?: string
  value: string
}
