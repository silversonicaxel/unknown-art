'use client'

import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import type { FC, HTMLAttributes } from 'react'

type SafeImageProps = HTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  fill: boolean
}

export const SafeImage: FC<SafeImageProps> = ({ src, alt, fill, ...props }) => {
  const [hideImage, setHideImage] = useState(false)

  const onError = useCallback(() => {
    setHideImage(true)
  }, [])

  if (hideImage) return null

  return (
    <Image
      alt={alt}
      src={src}
      loader={() => src}
      role='img'
      fill={fill}
      {...props}
      onError={onError}
    />
  )
}

SafeImage.displayName = 'SafeImage'
