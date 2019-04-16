import * as express from 'express'
import {Request, Response} from "express"
import { getRepository } from "typeorm"
const categoryRouter = express.Router()
import { Category } from "./category.entity"

// List categories
categoryRouter.get('/', async function(req: Request, res: Response) {
    const { perPage, page } = req.query

    interface where {
        category: String,
        name: String,
        perPage: Number,
        page: Number
      }

    return res.send(await getRepository(Category).find({
        skip: perPage * (page - 1),
        take: perPage,
      }))
})

// Add category
categoryRouter.post('/', async function(req: Request, res: Response) {
    return res.send(await getRepository(Category).save(req.body))
})

export { categoryRouter }