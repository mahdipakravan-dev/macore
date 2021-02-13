import { Application } from "express";
import bodyParser from 'body-parser'

export function bodyparser(app:Application){
  app.use(bodyParser.json({"type": "application/json"}))
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json())
}