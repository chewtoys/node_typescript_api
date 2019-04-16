import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import * as passport from 'passport'
import { User } from '../user/user.entity'
import { getRepository } from "typeorm"

function login(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET);
}

function createToken() {
  const user = {
    id: 1,
    username: "Testing",
    email: "test@test.co"
  }
  return jwt.sign({ user }, process.env.JWT_SECRET);
}

async function isAdmin(userObject) {
  const userRepository = await getRepository(User)
  const user = await userRepository.findOne(userObject.email)
  if(user.isAdmin) {
      return true
    }
  }

function validate(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
        })
      } else {
        return next()
      }
    })
  }

export { login, createToken, validate };