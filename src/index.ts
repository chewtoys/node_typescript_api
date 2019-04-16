import app from './App';
const debug = require('debug')('server')
import * as dotenv from 'dotenv'
import { createConnection } from 'typeorm'

try {
  dotenv.config({ path: __dirname + '/../.env' })
  //const application = Server.bootstrap()

  createConnection().then(() => {
    console.log(`✓ PostgresSQL DB Connection`)
  })

  app.listen(process.env.PORT || 5500, () => {
    console.log(`✓ HTTP Server (${process.env.PORT || 5500})`)
  })
} catch (err) {
  console.log(err)
}