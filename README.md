<p align="center">
  <a href="http://macore.ir" target="blank"><img src="https://s16.picofile.com/file/8424560968/profile_pic.png" width="120" alt="Mahdi Pakravan مهدی پاکروان" /></a>
  <h1 align="center">Macore <span>(Mahdi Nodejs Core)</span></h1>
</p>


## Description (V 0.0.2)

Macore is a framework for building easy and fast <a href="http://nodejs.org" target="_blank">Node.js</a> server-side applications. It uses modern JavaScript, is built with  <a href="http://www.typescriptlang.org" target="_blank">TypeScript</a> and combines elements of OOP (Object Oriented Programming), FP (Functional Programming) , DP (Design Patterns)

<p>Under the hood, Macore makes use of <a href="https://expressjs.com/" target="_blank">Express</a> .

## Getting started

* 1 - Install This nodejs Module From npm using : ``` npm i --save @mahdi.js/macore ```
* 2 - Create Your <b>start.js|ts</b> With Below Code : 
```
  //TypeScript : 
  import App from 'macore'
  App(host , port)

  //javascript :
  const App = require('macore')
  App(host , port)

  // Also You Can Config view+session+cookie !
  App(host , port , viewConfig , sessionConfig , cookieConfig)
```
* 3 - Your [Express App] + [Template Engine] + [Session] + [Cookie] Configured !
* 4 - Enjoy & * me on github :)

## What is Inside macore ?

### `axios`
**Send Any Request Using axios inside this package**
```
  sendRequest("path" , header , Request_Methods.METHOD , body) 
```

### `chalk`
**console.log With Fucking Great TextColors!**
* Read Document Inside [chalk](https://npmjs.com/package/chalk)
```
  console.log(ch.red("Hello With Red Color"))
```
