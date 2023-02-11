import axios from 'axios'
import Image from 'next/image'
import React, {useState} from 'react'
import styles from '../../styles/Admin.module.css'

function Index({productList, orders}) {
    const [pizzaList, setPizzaList] = useState(productList)
    const [orderList, setOrderList] = useState(orders)
    const status = ['preparing', 'on the way', 'delivered']
    const handleDelete = async (id) => {

        try {
            const res = await axios.delete('https://woksfoods.vercel.app/api/products/' + id)
            setPizzaList(pizzaList.filter(pizza=>pizza._id !== id))
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleStatus = async (id) => {
        const item = orderList.filter(order=> order._id === id )[0]
        const status = item.status
        try {
            const res = await axios.put('/api/orders/' + id, {status: status + 1})
            setOrderList([
                res.data,
                ...orderList.filter(order => order._id !== id),
            ])
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
            <tbody>
                <tr className={styles.trTitle}>
                    <th>Image</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </tbody>
            
                {productList.map(p=>(
                    <tbody key={p._id}>
                                    <tr className={styles.trTitle}>
                                    <td>
                                        <Image
                                        src={p.img}
                                        height={50}
                                        width={50}
                                        style={{objectFit: 'cover'}}
                                        alt=''/>
                                    </td>
                                    <th>{p._id.slice(0,5)}...</th>
                                    <td>{p.title}</td>
                                    <td>${p.prices[0]}</td>
                                    <td>
                                        <button className={styles.button}>edit</button>
                                        <button className={styles.button} onClick={() => handleDelete(p._id)}>Delete</button>
                                    </td>
                                </tr>
                                </tbody>
                ))}

           
        </table>

      </div>
      <div className={styles.item}>
      <h1 className={styles.title}>Orders</h1>
      <table className={styles.table}>
            <tbody>
                <tr className={styles.trTitle}>
                    <th>OrderId</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
               
            </tbody>
            {orderList.map(order=>(
                    
                  
            <tbody key={order._id}>
                <tr className={styles.trTitle}>
                    <td>
                       {order._id.slice(0,5)}...
                    </td>
                    <th>{order.customer}</th>
                    <td>${order.total}</td>
                    <td>{order.method === 0 ? (<span>cash</span>) : (<span>paid</span>)}</td>
                    <td>{status[order.status]}</td>
                   
                    <td>
                        <button onClick={() => handleStatus(order._id)}>Next Stage</button>
                    
                    </td>
                </tr>
            </tbody>
              ))}
        </table>

      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || '';
    if(myCookie.token !== process.env.TOKEN){
        return{
            redirect:{
                destination: '/admin/login',
                permanent: false,
            }
        }
    }

    const productList = await axios.get('https://woksfoods.vercel.app/api/products')
    const orders= await axios.get('https://woksfoods.vercel.app/api/orders')
    return{
        props:{
            orders: orders.data,
            productList:  productList.data
        }
    }
}

export default Index
