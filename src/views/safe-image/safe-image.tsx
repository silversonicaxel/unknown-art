'use client'

import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import type { FC } from 'react'

type SafeImageProps = {
  src: string
  alt: string
  fill: boolean
}

export const SafeImage: FC<SafeImageProps> = (src, props) => {
  const [hideImage, setHideImage] = useState(false)

  const onError = useCallback(() => {
    setHideImage(true)
  }, [])

  if (hideImage) return null

  return (
    <Image
      src={src}
      loader={() => src}
      role='img'
      {...props}
      onError={onError}
    />
  )
}

SafeImage.displayName = 'SafeImage'
