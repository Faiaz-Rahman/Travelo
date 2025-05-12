import { useState } from 'react'

export const useInteractionManager = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const [showComments, setShowComments] = useState<boolean>(false)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)

  const updateIsLiked = (value: boolean) => {
    setIsLiked(value)
  }

  const updateShowComments = (value: boolean) => {
    setShowComments(value)
  }

  const updateIsBookmarked = (value: boolean) => {
    setIsBookmarked(value)
  }

  return {
    isLiked,
    showComments,
    isBookmarked,
    updateIsLiked,
    updateIsBookmarked,
    updateShowComments,
  }
}
