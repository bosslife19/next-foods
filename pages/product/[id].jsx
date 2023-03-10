import React, {useState} from 'react'
import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'

function Product({product}) {
    const [size, setSize] = useState(0)
    const [price, setPrice] = useState(product.prices[0])
    const [extras, setExtras] = useState([])
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const changePrice = (number) => {
        setPrice(price + number)
    }
    const handleSize = (sizeIndex) => {
        const difference = product.prices[sizeIndex] - product.prices[size]
        setSize(sizeIndex)
        changePrice(difference)
    }
    const handleChange = (e, option) => {
        const checked = e.target.checked;
        if(checked){
            changePrice(option.price)
            setExtras(prev=>[...prev, option])
        }else{
            changePrice(-option.price)
            setExtras(extras.filter(extra=>extra._id !== option._id))
        }
    }
    const handleClick = () => {
      dispatch(addProduct({...product, extras, price, quantity}))
    }
    
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
            <Image src={product.img} fill alt='' style={{objectFit: 'contain'}}/>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
            <div className={styles.size} onClick={() =>handleSize(0)}>
                <Image alt='' src='/img/size.png' fill />
                <span className={styles.number}>Small</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(1)}>
                <Image alt='' src='/img/size.png' fill />
                <span className={styles.number}>Medium</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(2)}>
                <Image alt='' src='/img/size.png' fill />
                <span className={styles.number}>Large</span>
            </div>
        </div>
        <h3 className={styles.choose}>Choose additional Ingredient3</h3>
        <div className={styles.ingredients}>
            {product.extraOptions.map(option=>(
                 <div className={styles.option} key={option._id}>
                 <input type="checkbox"  
                 id={option.text} 
                 className={styles.checkbox} 
                 name={option.text}
                 onChange={e=>handleChange(e, option)}/>
                 <label htmlFor='double'>{option.text}</label>
             </div>
            ))}
           
           
        </div>
        <div className={styles.add}>
            <input type="number" defaultValue={1} className={styles.quantity} onChange={e=>setQuantity(e.target.value)}/>
            <button onClick ={handleClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {
    const response = await axios.get(`https://woksfoods.vercel.app/api/products/${params.id}`);
    return {
      props:{
        product: response.data,
      }
    }
  }

  

export default Product
