import express, { Application } from "express";
import morgan from 'morgan'

import IndexRotues from './routes/index.routes'

export class App {
  private app: Application;

  constructor(private port?:number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set('port', this.port || process.env.PORT || 3100 )
  }

  middlewares() {
    this.app.use(morgan("dev"))
    this.app.use(express.json())
  }

  routes() {
    this.app.use(IndexRotues);
  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log(`Server on port ${this.app.get('port')}`);
  }
}
