'use client'

import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import type { FC, HTMLAttributes } from 'react'

import styles from './safe-image.module.css'


type SafeImageProps = HTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

export const SafeImage: FC<SafeImageProps> = ({ src, alt, ...props }) => {
  const [hideImage, setHideImage] = useState(false)

  const onError = useCallback(() => {
    setHideImage(true)
  }, [])

  if (hideImage) return null

  return (
    <div>
      <Image
        className={styles.uasafeimage}
        alt={alt}
        src={src}
        loader={({ src }) => src}
        role="img"
        width="0"
        height="0"
        style={{ objectFit: 'fill' }}
        {...props}
        onError={onError}
      />
    </div>
  )
}

SafeImage.displayName = 'SafeImage'
