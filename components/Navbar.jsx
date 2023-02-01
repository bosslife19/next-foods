import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'

import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
function Navbar() {

  const quantity = useSelector(state=>state.cart.quantity)
  return (
    <div className={styles.container}>
      <div className={styles.item}>

      
      <div className={styles.callButton}>
        <Image src='/img/telephone.png' alt='' width='32' height='32' />
      </div>
      <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW</div>
          <div className={styles.text}>090 664 876 38</div>
      </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/' passHref>
         
          <li className={styles.listItem}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
       <h1>Wokz Restaurant</h1>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contacts</li>
        </ul>
      </div>
      <Link href='/cart' passHref>
      <div className={styles.item}>
        <div className={styles.cart}>
        <Image src='/img/cart.png' alt='' width='30' height='30'/>
        <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
      </Link>
      </div>
  )
}

export default Navbar