/**
 * Version : 0.0.6
 * Changes : You Can Create Instance of your apiService
*/
import axios from 'axios'
import {Request_Methods} from "../types/interfaces";
import * as http from "http";
import * as https from "https";

const httpAgent = new http.Agent({keepAlive : true})
const httpsAgent = new https.Agent({keepAlive:true})

const instance = axios.create({
  httpAgent,
  httpsAgent
})

export default class ApiService{
  /**
   * @param uri : REQUIRED example : https://macore.ir/api
   * @param headers : OPTIONAL example : {allow-origin : true}
   */
  constructor(
      protected uri : string,
      protected headers ?: any
  ) {}

  /**
   * @param url : REQUIRED example : user/:id
   * @param method REQUIRED Request_Methods.TYPE
   * @param body OPTIONAL
   * @param header OPTIONAL
   */
  public async callService<Request = any , Response = any>(
      url : string ,
      method : Request_Methods ,
      body ?: Request|any ,
      header ?: any
  ){

    const headers = {
      ...this.headers ,
      ...header
    }
    const requestOptions = {
      url : this.uri + url ,
      headers ,
      method ,
      body : body || {}
    }

    return (await instance(requestOptions)).data
    }
}