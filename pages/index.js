import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { Inter } from '@next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import Featured from '../components/Featured'
import ProductList from '../components/ProductList'
import { useState } from 'react'
import Add from '../components/Add'
import AddButton from '../components/AddButton'



const inter = Inter({ subsets: ['latin'] })

export default function Home({productList, isAdmin}) {
  const [close, setClose] = useState(true)

  return (
    <>
    
      <Head>
        <title>Food Ordering Site</title>
        <meta name="description" content="Best online food delivery services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      {isAdmin && <AddButton setClose={setClose}/>}
      <ProductList productList={productList}/>
      {!close && <Add setClose={setClose}/>}
   
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  let isAdmin = false;
  if(myCookie.token === process.env.TOKEN){
    isAdmin = true;
  }
  const response = await axios.get('api/products');
  return {
    props:{
      productList: response.data,
      isAdmin
    }
  }
}