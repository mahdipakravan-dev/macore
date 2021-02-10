<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <h1 align="center">Macore <span>(Mahdi.js Nodejs Core)</span></h1>
</p>


## Description

Macore is a framework for building easy and fast <a href="http://nodejs.org" target="_blank">Node.js</a> server-side applications. It uses modern JavaScript, is built with  <a href="http://www.typescriptlang.org" target="_blank">TypeScript</a> and combines elements of OOP (Object Oriented Programming), FP (Functional Programming) , DP (Design Patterns)

<p>Under the hood, Macore makes use of <a href="https://expressjs.com/" target="_blank">Express</a> .

## Getting started

* Read Document Inside [guide](https://docs.macore.ir)
* 1 - Install This nodejs Module From npm using : ``` npm i --save @mahdi.js/macore ```
* 2 - Create Your <b>start.js|ts</b> With Below Code : 
```
  import App from 'macore'
  App(host , port)
```
* 3 - Enjoy !

## What is Inside macore ?

### `axios`
**You Can Send Any Request Using axios inside this package**
```
  import {sendRequest} from 'macore'
  sendRequest("path" , header , Request_Methods.METHOD , body) 
```

### `chalk`
**console.log With Fucking Great TextColors!**
* Read Document Inside [chalk](https://npmjs.com/package/chalk)
```
  import {ch} from 'macore'
  console.log(ch.red("Hello With Red Color"))
```

### `view + cookie + session`
**Config Your template engine realy easy**
```
  App(host , port , viewConfig , cookieConfig , sessionConfig)
```