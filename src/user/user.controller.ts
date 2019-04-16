import * as express from 'express'
import { Request, Response } from "express"
import { getRepository } from "typeorm"
const userRouter = express.Router()
import { User } from "./user.entity"

// List users
userRouter.get('/', async function(req: Request, res: Response) {
    const { perPage, page } = req.query

    interface where {
        category: String,
        name: String,
        perPage: Number,
        page: Number
      }

    return res.send(await getRepository(User).find({
        skip: perPage * (page - 1),
        take: perPage,
      }))
})

// Make user an admin
userRouter.put('/:name', async function(req: Request, res: Response) {
    const userRepository = await getRepository(User)
    const user = await userRepository.findOne(req.params)
    user.isAdmin = true
    return res.send(await userRepository.save(user))
})

export { userRouter }