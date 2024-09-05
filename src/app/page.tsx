import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import logo from '@/images/logo_2.jpeg'

const Home = () => {
  const TirillaFilm = () => {
    return (
      <div className={styles.tirilla_container}>
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
        <div className={styles.square} />
      </div>
    )
  }
  return (
    <div className={styles.home_container}>
      <TirillaFilm />
      <div className={styles.photo_space}>
        <Image
        className={ styles.logo_image }
          src={ logo }
          alt="logo"
        />
      </div>
      <TirillaFilm />
    </div>
  )
}

export default Home
