/**
 * V0.0.6
 * Changing This Index
 */

import express , {Express} from "express";
import chalk from 'chalk'
import * as fs from "fs";
import dotenv from 'dotenv'
import {bodyparser} from "../configuration/bodyparser";
import cookie from "../configuration/cookie";
import session, {ISessionConfig} from "../configuration/session";
import view, {IViewConfig} from "../configuration/view";
import {Request_Methods} from "../types/interfaces";
import ApiServices from "../utils/apiService";
import MongoAdaptor from '../configuration/mongo'

export default class App {
    _app : Express = express()

    constructor(
        port ?: number|string ,
        host ?: string|null ,
        cookieSecret ?: string|null ,
        sessionConfig ?: ISessionConfig | null ,
        viewConfig ?: IViewConfig|null ,
        mongoConfig ?: boolean
    ) {
        this._app.set("port" , port || 3000 )
        this._app.set("host" , host || "localhost")

        this.envConfig()

        expressConfig(this._app)
        if(cookieSecret) cookie(this._app , cookieSecret)
        if(sessionConfig) session(this._app , sessionConfig)
        if(viewConfig) view(this._app , viewConfig)
        if(mongoConfig) new MongoAdaptor(this)
    }

    public listen(port ?: string|number , callback ?: (...args : any[]) => void){
        this._app.listen(this.get("port") || port , callback)
        console.log(`
        -------- ${chalk.blue("Server STARTED ON : ")} => ${this.get("host")}:${this.get("port")} --------------------`)
    }

    public route(path:string , method : Request_Methods , ...middlewareAndControllers : any[]){
        this._app[method](path , middlewareAndControllers)
    }

    get(key:string) : string|any{
        return this._app.get(key)
    }

    set(key:string , value:any) {
        return this._app.set(key,value)
    }

    getEnv(key:string) : string|any{
        return process.env[key]
    }

    private envConfig(){
        if(fs.existsSync(".env")){
            console.log(chalk.green(".ENV File Found Success"))
            return dotenv.config({path : ".env"})
        } else if(fs.existsSync('.env.example')){
            console.log(chalk.yellow(".ENV File is Under EXAMPLE Mode , Everything is OK But Change it in FUTURE"))
            return dotenv.config({path : ".env.example"})
        }
    }

}
export const ch = chalk
export const ApiService = ApiServices