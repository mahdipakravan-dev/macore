import { Application } from "express";
import bodyParser from 'body-parser'
import AllowOriginMd from "../middlewares/origin";
import lusca from "lusca";

export function express(app:Application){
  app.use(bodyParser.json({"type": "application/json"}))
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json())
  app.use(lusca.xframe("SAMEORIGIN"))
  app.use(lusca.xssProtection(true))
  app.use(AllowOriginMd.handle)
}