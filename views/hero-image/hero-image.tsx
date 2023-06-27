import React from 'react'
import styles from './hero-image.module.css'
import Image from 'next/image'

const HeroImage = () => {
  return (
    <div className={styles.uaheroimage}>
      <Image
        src='/hero-image.png'
        alt='hero image unknown art'
        role='presentation'
        aria-label='hero image unknown art'
        fill
      />
    </div>
  )
}

export default HeroImage
