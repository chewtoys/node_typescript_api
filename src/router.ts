import * as express from 'express'
import { authRouter } from './auth/auth.controller'
import { userRouter } from './user/user.controller'
import { orderRouter } from './order/order.controller'
import { productRouter } from './product/product.controller'
import { categoryRouter } from './category/category.controller'
import { validate } from './middleware/jwt.middleware'

const router = express.Router()

router.all('*', validate)
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)

export { router }