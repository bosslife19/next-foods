import dbConnect from '../../../utils/mongo'
import Product from '../../../models/Product'

export default async function handler(req, res) {
    const {method,
          query : {id}
        }  = req;
      


    await dbConnect()
    if(method === 'GET'){
      try {
        const products = await Product.findById(id)
        res.status(200).json(products)
      } catch (error) {
        res.status(500).json(error)
      }
    }
    if(method === 'PUT'){
     
    }
    if(method === 'DELETE'){
    
        try {
          console.log('tried')
         await Product.findByIdAndDelete(id)
          res.status(200).json('the product has been deleted')
        } catch (error) {
          res.status(500).json(error.message)
        }
      }
  }