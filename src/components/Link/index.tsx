import { default as NextLink } from 'next/link'
import React from 'react'
import styles from './index.module.scss'

interface Props {
  href: string
  text: string
}

const Link: React.FC<Props> = ({ href, text }) => {
  return (
    <NextLink href={href || ''} className={styles.link}>
      {text}
    </NextLink>
  )
}

export default Link
