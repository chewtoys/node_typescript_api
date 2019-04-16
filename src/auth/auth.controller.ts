import * as express from 'express'
import { Request, Response } from 'express'
import { AuthenticationService, IRefreshable, IAuthenticable } from 'auth-lib'
import { login } from '../middleware/jwt.middleware'
import LoginBody from '../types/login'
import { User } from '../user/user.entity'
import { getRepository } from "typeorm"
const authRouter = express.Router()

async function getUser(login: any) {
    const user = await getRepository(User).findOne({ login })
    if (!user) {
        return null
    }
    return user
}

async function saveUser({ login }, passwordHash): Promise<IAuthenticable> {
    return await getRepository(User).save({ login, passwordHash })
}

const authenticationService = new AuthenticationService({
    secret: 'my-secret-secret',
    accessTokenExp: 900,
    refreshTokenExp: 86400
  })

authRouter.post('/register', function(req: Request, res: Response) {
    const { login, password }: LoginBody = req.body
    const result = authenticationService.register({ login }, password, saveUser, createRefreshToken)
    return res.json(result)
})

authRouter.post('/login', function(req: Request, res: Response) {
    const { login, password }: LoginBody = req.body
    const token = authenticationService.login(login, password, getUser)
    return res.json(token)
})

export { authRouter }