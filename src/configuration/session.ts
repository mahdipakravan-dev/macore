import { Application } from "express";
import expressSession from 'express-session'

export interface ISessionConfig {
  secret: string,
  saveUninitialized ?: boolean,
  resave ?: boolean ,
  cookie ?: { maxAge: number }
}

export default function session(app:Application , config:ISessionConfig){
  app.use(expressSession({
    secret: config.secret,
    saveUninitialized: config.saveUninitialized || true,
    resave : config.resave || true ,
    cookie: config.cookie || {}
  }))
}