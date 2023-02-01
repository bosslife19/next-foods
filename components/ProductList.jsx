import styles from '../styles/ProductList.module.css';

import React from 'react'
import ProductCard from './ProductCard';

function ProductList({productList}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST FOOD RESTAURANT IN TOWN</h1>
     <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
     Facilis unde, numquam mollitia placeat temporibus quia laboriosam minima. Deleniti 
     cum autem reiciendis laudantiribus, repudiandae non natus expedita 
      nesciunt, porro delectus fac
      </p>
      <div className={styles.wrapper}>
       {
        productList.map(product=>(
          <ProductCard key={product._id} product={product}/>
        ))
       }
       
        
      </div>
    </div>
  )
}

export default ProductList
