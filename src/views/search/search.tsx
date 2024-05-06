import { memo } from 'react'
import type { FC } from 'react'
import styles from './search.module.css'

export const Search: FC = memo(() => {
  return (
    <form>
      <div className={styles.uasearch}>
        <input placeholder='name' name='name' data-1p-ignore />
      </div>
    </form>
  )
})

Search.displayName = 'Search'
