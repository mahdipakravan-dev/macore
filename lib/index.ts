import * as express from 'express'
import * as config from 'config'

import { bodyparser } from "./configuration/bodyparser";
import serve from "./configuration/server";
import view , {IViewConfig} from './configuration/view';
import session , {ISessionConfig} from './configuration/session'

import { axiosSendRequest } from './utils/axios';
import chalk from "./utils/chalk";
import cookie from './configuration/cookie';

/**
 * @param host 
 * @param port 
 * @param viewConfig 
 * @param cookieConfig 
 * @param sessionConfig 
 */
export default function AppFunc(
  host : string ,
  port : string|number,
  viewConfig ?: IViewConfig|null ,
  cookieConfig ?: string|null ,
  sessionConfig ?: ISessionConfig|null) : express.Application {
  
  const app : express.Application = express()
  app.set("host" , host)
  app.set("port" , port)

  bodyparser(app)
  if(viewConfig) view(app , viewConfig)
  if(cookieConfig) cookie(app , cookieConfig)
  if(sessionConfig) session(app , sessionConfig)

  serve(app)
  return app

}

export const ch = chalk
export const sendRequest = axiosSendRequest
export const configuration = config 