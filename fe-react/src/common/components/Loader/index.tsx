import React from 'react'
import clsx from 'clsx'
import styles from './Loader.module.scss'

type PropsType = {
  mode?: 'normal' | 'reverse-color'
}

export const Loader: React.FC<PropsType> = ({ mode }) => {
  return (
    <div className={clsx(styles.wrapper, mode)}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
