import Image from 'next/image'
import React from 'react'
import styles from '../styles/Footer.module.css'

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
      <Image src='/img/bg.png' fill  alt='' style={{objectFit: 'contain'}}/>
      
      </div>
    <div className={styles.item}>
      <div className={styles.card}>
        <h2 className={styles.motto}>BEST CHAIN OF RESTAURANTS IN THE WORLD!</h2>
      </div>
      <div className={styles.card}>
        <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
        <p className={styles.text}>
          1645 R. Don Road #304
          <br/> New York, 85022
          <br/> (602) 867-1010
        </p>
        <p className={styles.text}>
          1645 R. Don Road #304
          <br/> New York, 85022
          <br/> (602) 867-1010
        </p>
        <p className={styles.text}>
          1645 R. Don Road #304
          <br/> New York, 85022
          <br/> (602) 867-1010
        </p>
        <p className={styles.text}>
          1645 R. Don Road #304
          <br/> New York, 85022
          <br/> (602) 867-1010
        </p>
      </div>
      <div className={styles.card}>
      <h1 className={styles.title}>WORKING HOURS</h1>
      <p className={styles.text}>
        SATURDAY - SUNDAY
        <br/> 12:00 - 24:00
      </p>
      </div>
    </div>
    </div>
  )
}

export default Footer