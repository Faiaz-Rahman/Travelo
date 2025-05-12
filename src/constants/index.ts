import { Dimensions } from 'react-native'
// import {PopularListType} from 'src/interfaces';

export const Dim = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  standardWidth: Dimensions.get('window').width * 0.85,
}

export const Colors = {
  darkBlack: '#181A1C',
  pureBlack: '#000',
  socialBlue: '#2E8AF6',
  socialPink: '#F62E8E',
  socialWhite: '#ECEBED',
  white: '#fff',
  darkGray: '#323436',
  lighterGray: '#727477',
  gradient: ['#F62E8E', '#F62E8E', '#AC1AF0'],
}

export const gradientColors = [
  '#F58529',
  '#F62E8E',
  '#D62976',
  '#962FBF',
  '#4F5BD5',
]

export const dummyData = [
  {
    storyImage: require('../assets/images/post1.png'),
    userImage: require('../assets/images/user1.png'),
  },
  {
    storyImage: require('../assets/images/post2.png'),
    userImage: require('../assets/images/user2.png'),
  },
  {
    storyImage: require('../assets/images/post3.png'),
    userImage: require('../assets/images/user3.png'),
  },
  {
    storyImage: require('../assets/images/post1.png'),
    userImage: require('../assets/images/user1.png'),
  },
  {
    storyImage: require('../assets/images/post3.png'),
    userImage: require('../assets/images/user3.png'),
  },
  {
    storyImage: require('../assets/images/post2.png'),
    userImage: require('../assets/images/user2.png'),
  },
]

export const popularItemList: any[] = [
  {
    _id: 1,
    title: 'All',
  },
  {
    _id: 2,
    title: 'Photos',
  },
  ,
  {
    _id: 3,
    title: 'Videos',
  },
  ,
  {
    _id: 4,
    title: 'Profiles',
  },
  ,
  {
    _id: 5,
    title: 'Links',
  },
  ,
  {
    _id: 6,
    title: 'Texts',
  },
]
