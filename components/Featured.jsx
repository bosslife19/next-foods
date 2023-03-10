import React, { useState } from 'react'
import styles from '../styles/Featured.module.css'
import Image from 'next/image'

function Featured() {
    const [index, setIndex] = useState(0)
    const images = [
        '/img/pizza.png',
        '/img/featured2.png',
        '/img/featured3.png',
    ]

    const handleArrow = (direction)=>{
        if(direction === 'l'){
            setIndex(index !== 0? index -1 : 2)
        }

        if(direction === 'r'){
            setIndex(index !== 2? index +1 : 0)
        }
    }
  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer} style={{left: 0}} onClick={() => handleArrow('l')}>
        <Image src='/img/arrowl.png' alt='' fill style={{objectFit: 'contain'}}/>
        </div>
       
        <div className={styles.wrapper} style={{transform:`translateX(${-100 * index}vw)`}}>
       
            {images.map((image, index)=>(
                 <div className={styles.imgContainer} key={index}>
                <Image src= {image}  alt='' fill style={{objectFit: 'contain'}}/>
                </div>
            ))}
       
        </div>
        <div className={styles.arrowContainer} style={{right: 0}} onClick={() => handleArrow('l')}>
        <Image src='/img/arrowr.png' alt='' fill style={{objectFit: 'contain'}}/>
        </div>
       
      
    </div>
  )
}

export default Featured
