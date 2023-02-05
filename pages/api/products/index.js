import dbConnect from '../../../utils/mongo'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    const {method, cookies}  = req;
    // const token = cookies.token
  console.log('conecting..')
    dbConnect()
    console.log('finished connecting')
    if(method === 'GET'){
      try {
        console.log('ran')
        const products = await Product.find()
        console.log('returned')
        res.status(200).json(products)
      } catch (error) {
        res.status(500).json(error)
      }
    }
    if(method === 'POST'){
      // if(!token || token !==process.env.TOKEN){
      //   return res.status(401).json('You are not authenticated')
      // }
      try {
        console.log('tried')
        const product =  await Product.create(req.body)
        res.status(201).json(product)
      } catch (error) {
        res.status(500).json(error.message)
      }
    }
  }