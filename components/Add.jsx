import { useState } from "react"
import styles from '../styles/Add.module.css'
import axios from "axios"
import { useRouter } from "next/router"

function Add({setClose}) {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [prices, setPrices] = useState([])
    const [extra, setExtra] = useState(null)
    const [extraOptions, setExtraOptions] = useState([])

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value
        setPrices(currentPrices)
    }
    
    const handleExtraInput = (e) => {
        setExtra({...extra, [e.target.name]: e.target.value})
    }
    const handleExtra = e=>{
        setExtraOptions(prev=>[...prev, extra]);
    }

    const handleCreate = async () => {
        const data = new FormData();
        data.append('file', file)
        data.append('upload_preset', 'food-ordering-app')
        try {
            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/wokodavid/image/upload'
        , data)
        const {url} = uploadRes.data;
        const newProduct = {title, desc, prices, extraOptions, img: url}
        await axios.post('/api/products', newProduct)
        setClose(true)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
        <span onClick={()=>setClose(true)} className={styles.close}>X</span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
            <label className={styles.label}>Choose an Image</label>
            <input type='file' onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className={styles.item}>
            <label className={styles.label}>Title</label>
            <input type='text' className={styles.input} onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div className={styles.item}>
            <label className={styles.label}>Desc</label>
           <textarea
           rows={4}
           type='text'
           onChange={e=>setDesc(e.target.value)}
           ></textarea>
        </div>
        <div className={styles.item}>
            <label className={styles.label}>Prices</label>
            <div className={styles.priceContainer}>

            
            <input type='number'
             placeholder='Small'
             className={`${styles.input} ${styles.inputSmall}`}
              onChange={e=>changePrice(e,0)}
            />
            <input type='number'
             placeholder='Medium'
             className={`${styles.input} ${styles.inputSmall}`}
              onChange={e=>changePrice(e,1)}
            />
            <input type='number'
             placeholder='Large'
             className={`${styles.input} ${styles.inputSmall}`}
              onChange={e=>changePrice(e,2)}
            />
            </div>
        </div>
        <div className={styles.item}>
            <label className={styles.label}>Extra</label>
            <div className={styles.extra}>
                <input 
                className={`${styles.input} ${styles.inputSmall}`}
                type='text'
                name='text'
                placeholder='item'
                onChange={handleExtraInput}/>

            <input 
                className={`${styles.input} ${styles.inputSmall}`}
                type='number'
                placeholder='Price'
                name='price'

                onChange={handleExtraInput}/>

           
                <button className={styles.extraButton} onClick={handleExtra}>Add</button>
            </div>
            <div className={styles.extraItems}>
                {extraOptions.map(option=>(
                    <span key={option.text} className={styles.extraItem}>{option.text}</span>

                ))}
            </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>Create</button>
    </div>
    </div>
  )
}

export default Add
