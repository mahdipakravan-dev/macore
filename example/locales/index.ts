import {fa} from './fa'
import {en} from './en'
import { Ii18Config } from '../../src/configuration/i18'

const i18Config : Ii18Config = {
  lng : "en" ,
  fallbackLng : "en" ,
  preload : ["en" , "fa"] ,
  saveMissing : false ,
  load : "languageOnly" ,
  resources : {
    en , 
    fa
  }
}

export default i18Config