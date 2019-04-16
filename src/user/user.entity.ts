import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IAuthenticable, IRefreshable } from 'auth-lib'


@Entity()
export class User implements IAuthenticable, IRefreshable {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  login: string

  @Column()
  passwordHash: string

  @Column()
  refreshTokens: Array<{token: string,
                        valid: boolean}>

  @Column()
  email: string

  @Column({ default: false })
  isAdmin: boolean
}

