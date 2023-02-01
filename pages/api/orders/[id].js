import dbConnect from '../../../utils/mongo'
import Order from '../../../models/Order'

const handler = async (req, res) => {
    const {method, query:{id}} = req;
    await dbConnect()
    if(method === 'GET'){
        try {
            const order = await Order.findById(id)
            res.status(200).json(order)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if(method === 'POST'){}
    if(method === 'PUT'){
        try {
            console.log('tried')
            const order =  await Order.findByIdAndUpdate(id, req.body, {new: true})
            res.status(201).json(order)
          } catch (error) {
            res.status(500).json(error.message)
          }
    }
    if(method === 'DELETE'){}
}

export default handler;