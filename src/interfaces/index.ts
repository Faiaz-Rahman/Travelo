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
