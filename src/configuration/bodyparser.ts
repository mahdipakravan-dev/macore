import { Application } from "express";
import bodyParser from 'body-parser'
import { Adaptor } from "../types/adaptors";

export default class BodyParser extends Adaptor {

  init() {
    this.app.use(bodyParser.json({"type": "application/json"}))
    this.app.use(bodyParser.urlencoded({extended : true}));
    this.app.use(bodyParser.json())

    console.log("Body Parser Initialized")
  }

}