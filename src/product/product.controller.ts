import * as express from 'express'
import {Request, Response} from "express"
import { getRepository, Like } from "typeorm"
import { Product } from "./product.entity"

const productRouter = express.Router()

// Get product list
productRouter.get('/', async function(req: Request, res: Response) {
  const { perPage, page, category, name } = req.query
  
  interface where {
    category: string,
    name: string,
  }

  const where = {}

  if (category) {
    where['category'] = category
  }

  if (name) {
    where['name'] = Like(`${name}%`)
  }
  
  const products = await getRepository(Product).find({
    skip: perPage * (page - 1),
    take: perPage,
    where
  }) 

  return res.send({ 
    perPage,
    page,
    where,
    products 
  })
})

// Get details about specific product
productRouter.get('/:id', async function(req: Request, res: Response) {
  const { id } = req.params
  return res.send(await getRepository(Product).findOne({ id }))
})

// Add porduct
productRouter.post('/', async function(req: Request, res: Response) {
  const { name, imageUrl, price, description, category } = req.body
  return res.send(await getRepository(Product).save({name, imageUrl, price, description, category}))
})

export { productRouter }