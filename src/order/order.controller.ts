import * as express from 'express'
import { Request, Response } from "express"
import { validate } from '../middleware/jwt.middleware'
import { getRepository } from "typeorm"
import { Order } from "./order.entity"
import { Product } from "../product/product.entity"
import { sendEmail } from '../email/email.sender'
import { calculatePriceTotal } from './helpers/calculatePriceTotal'
const orderRouter = express.Router()


//List orders
orderRouter.get('/', 
    async function(req: Request, res: Response) {
    const { perPage, page } = req.query

    interface where {
        perPage: Number,
        page: Number
      }

    return res.send(await getRepository(Order).find({
        skip: perPage * (page - 1),
        take: perPage,
    }))
})  

//Add order
orderRouter.post('/', async function(req: Request, res: Response) {
    const productsNames = req.body.products.map((product: Product) => product.name)
    const totalPrice = calculatePriceTotal(req.body.products)

    const message = {
        from: 'sender_email',
        to: req.body.email,
        subject: 'Order created',
        text: 'Plaintext version of the message',
        html: `<p>Hello ${req.body.user}! You have bought a ${productsNames.join(', ')} for ${totalPrice} dollars.</p>`
      }
    
    sendEmail(message) 
    return res.send(await getRepository(Order).save(req.body))
})


export { orderRouter }