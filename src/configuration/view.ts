import * as express from "express";
import chalk from "chalk";

export interface IViewConfig {
  viewEngine ?: string
  viewEngineLayoutHandler ?: any
  viewDirectory ?: string
  staticDirectory ?: string
  masterLayout ?: string
  extractScripts ?: boolean
  extractStyles ?: boolean
}

export default function view(app:express.Application , viewConfig : IViewConfig){
  try {
    app.set("view engine" , viewConfig.viewEngine || "ejs")
    app.set("views" , viewConfig.viewDirectory || "views")
    app.use(express.static(viewConfig.staticDirectory || "public"));
    if(viewConfig.viewEngineLayoutHandler) app.use(viewConfig.viewEngineLayoutHandler)
    app.set("layout" , viewConfig.masterLayout || "master")
    app.set("layout extractScripts",viewConfig.extractScripts || true)
    app.set("layout extractStyles", viewConfig.extractStyles || true)
  }catch (e){
    console.error(chalk.red("Error During Config View Adaptors Inside : " , e))
  }

}