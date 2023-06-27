import Image, { ImageLoader } from 'next/image'
import React, { useCallback, useState } from 'react'
import type { FC } from 'react'

type SafeImageProps = {
  src: string
  loader: ImageLoader
  alt: string
  fill: boolean
}

export const SafeImage: FC<SafeImageProps> = (props) => {
  const [hideImage, setHideImage] = useState(false)

  const onError = useCallback(() => {
    setHideImage(true)
  }, [])

  if (hideImage) return null

  return <Image role='img' {...props} onError={onError} />
}

SafeImage.displayName = 'SafeImage'
