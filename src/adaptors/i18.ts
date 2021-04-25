export interface Ii18Config {
  lng : string ,
  fallbackLng : string ,
  preload : string[] , // Array of language Preload
  saveMissing : boolean , //Save Missing Key or no
  load : "languageOnly" ,  // Codes for detect language
  resources : any
}