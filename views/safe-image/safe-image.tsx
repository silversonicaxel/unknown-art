import React, { useState } from 'react'
import type { FC } from 'react'
import Image, { ImageLoader } from 'next/image'

type SafeImageProps = {
  src: string
  loader: ImageLoader
  alt: string
  fill: boolean
}

const SafeImage: FC<SafeImageProps> = (props) => {
  const [hideImage, setHideImage] = useState(false)

  if (hideImage) return null

  return (
    <Image
      role='img'
      {...props}
      onError={() => {
        setHideImage(true)
      }}
    />
  )
}

export default SafeImage
