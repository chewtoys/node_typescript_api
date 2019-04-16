import express from 'express'
import * as bodyParser from 'body-parser'
import { router } from './router'
import "reflect-metadata"
import cookieSession from 'cookie-session';
import keys from "./config/keys"

class App {
    public express: express.Express

    constructor() {
      this.express = express();
      this.configureMiddleware(this.express)
      this.mountRoutes()
    }

    private configureMiddleware(app: express.Express): void {
      app.use(bodyParser.json())
      app.use(
        cookieSession({
          maxAge: 30 * 24 * 60 * 60 * 1000,
          keys: [keys.cookieKey],
        }),
      );
    }
  private mountRoutes(): void {
    this.express.use('/', router)
  }
}

export default new App().express;
