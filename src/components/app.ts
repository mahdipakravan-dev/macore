/**
 * V0.0.6
 * Changing This Index
 */

import express , {Express} from "express";
import chalk from 'chalk'
import * as fs from "fs";
import dotenv from 'dotenv'
import cookie from "../adaptors/cookie";
import session, {ISessionConfig} from "../adaptors/session";
import view, {IViewConfig} from "../adaptors/view";
import {Request_Methods} from "../types/interfaces";
import ApiServices from "../utils/apiService";
import MongoAdaptor from '../adaptors/mongo'
import i18next from 'i18next'
import i18nextMiddleware, { I18next } from "i18next-express-middleware"
import {Ii18Config} from '../configuration/i18'

export default class App {
    _app : Express = express()
    I18Next : any ;

    constructor(
        port ?: number|string ,
        host ?: string|null ,
        cookieSecret ?: string|null ,
        sessionConfig ?: ISessionConfig | null ,
        viewConfig ?: IViewConfig|null ,
        mongoConfig ?: boolean ,
        i18Config ?: Ii18Config | null
    ) {
        this._app.set("port" , port || 3000 )
        this._app.set("host" , host || "localhost")

        this.envConfig()

        if(cookieSecret) cookie(this._app , cookieSecret)
        if(sessionConfig) session(this._app , sessionConfig)
        if(viewConfig) view(this._app , viewConfig)
        if(mongoConfig) new MongoAdaptor(this)
        if(i18Config) this.configI18(i18Config)
    }

    configI18(i18Config : Ii18Config){
        i18next
            .init(i18Config)
        this._app.use(i18nextMiddleware.handle(i18next))
        this.I18Next = i18next
    }

    /**
     * @param str @REQUIRED : key of Your Text
     * @param lan @OPTIONAL : your configured lang preload , if not = lng
     * @param val @OPTIONAL : if your key have {{val}} , You can Pass This arg
     */
    public t(str:any , lan?:string , val?:any){
        if(lan) this.I18Next.changeLanguage(lan)
        if(!val) return this.I18Next.t(str)
        return this.I18Next.t(str , val)
    }

    /**
     * @param lan  @REQUIRED : lang preload
     */
    public changeLanguage(lan:string) : void{
        this.I18Next.changeLanguage(lan)
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