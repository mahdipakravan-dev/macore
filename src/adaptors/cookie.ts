import cookieParser from 'cookie-parser'
import { Application } from 'express';

export default function cookie(app:Application , secret : string){
  app.use(cookieParser(secret))
}