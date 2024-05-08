import Image from 'next/image'
import React from 'react'
import type { FC } from 'react'

import styles from './hero-image.module.css'


export const HeroImage: FC = () => {
  return (
    <div className={styles.uaheroimage}>
      <Image
        src="/hero-image.png"
        alt="hero image unknown art"
        role="presentation"
        aria-label="hero image unknown art"
        fill
      />
    </div>
  )
}

HeroImage.displayName = 'HeroImage'
