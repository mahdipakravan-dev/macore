<p align="center">
  <a href="http://macore.ir" target="blank"><img src="https://s16.picofile.com/file/8424560968/profile_pic.png" width="120" alt="Mahdi Pakravan مهدی پاکروان" /></a>
  <h1 align="center">Macore <span>(Mahdi Nodejs Core)</span></h1>
</p>


## Description (V 0.0.6) MongoORM IMPLEMENTED !!!

Macore is a framework for building easy and fast <a href="http://nodejs.org" target="_blank">Node.js</a> server-side applications. It uses modern JavaScript, is built with  <a href="http://www.typescriptlang.org" target="_blank">TypeScript</a> and combines elements of OOP (Object Oriented Programming), FP (Functional Programming) , DP (Design Patterns)

<p>Under the hood, Macore makes use of <a href="https://expressjs.com/" target="_blank">Express</a> .

## Table Of Macore Features

- [Quick Start](#quick-start)
- [Router](#router)
- [Utilities](#utilities)
    - [Validation](#validation)
    - [ApiService](#apiservice)
    - [Chalk](#chalk)
    - [AllowOrigin](#allow-origin)
- [ORM](#orm)

## Quick Start

* 1 - Install This nodejs Module From npm using : ``` npm i --save @mahdi.js/macore ```
* 2 - Create Your <b>start.js|ts</b> With Below Code : 
```
  //TypeScript : 
  import App from 'macore'
  App(port)

  //javascript :
  const App = require('macore')
  App(port)

  // Also You Can Config view+session+cookie !
  App(
    port , 
    host , 
    viewConfig ,  // config OR {} OR Null(if you not need view)
    sessionConfig , // config OR {} OR Null(if you not need session)
    cookieConfig , // config OR {} OR Null(if you not need cookie)
    true // MongoConnection => true OR false
  ) 
```
* 3 - Your <b>Macore</b> App Configured !

<br/>
<hr/>

## Router

```
  //const app = new App(port , host , ...)
  app.route("/" , Request_Methods.GET , (req:Request , res:Response , next:NextFunction) => {res.send("Hello Macore")})
```

## Validation
Macore Validator is Using [class-validator](https://github.com/typestack/class-validator)
1-Create Your dto(data transfer object) file , Example : Signin.dto.ts
```
  import { IsString, Length } from 'class-validator';
  export default class SigninDto {
      @IsString()
      public name!: string;
  }
```
2-Set This Dto To Your app as a midleware
```
  app.route("/" , Request_Methods.POST , MacoreValidator(SignInDto) , Controller)
  
  /*
    * also you can pass your callback url if you are using view
    * this will be rediredct to callbackUrl
  */
  app.route("/" , Request_Methods.POST , MacoreValidator(SignInDto , "/home") , Controller)
```

## Utilities
This is Really Can Help You in any projects
> Note: you can cancel several requests with the same cancel token.

### `ApiService`
**Send Any Request Using axios inside this package**
```
    import {ApiService} from '@mahdi.js/macore'
    const apiInstance = new ApiService("https://jsonplaceholder.typicode.com/")
    await apiInstance.callService("todos/1" , Request_Methods.GET)
    
    //Also You Can Send Type of your Request & Response in Typescript
    await apiInstance.callService<RequestInterface , ResponseInterface>("todos/1" , Request_Methods.GET) 
```

### `chalk`
**console.log With Fucking Great TextColors!**
> You Can Read Document Inside [chalk](https://npmjs.com/package/chalk)
```
  import {ch} from '@mahdi.js/macore'
  console.log(ch.red("Hello With Red Color"))
```

### `Allow Origin`
**To Fix Connection With Your API Problems**
```
  import AllowOriginMd from '@mahdi.js/macore/middlewares/origin'
  app.use(AllowOriginMd)
```

<br/>
<hr/>


## ORM
> In This Version You Just Can Use MongoORM in the future we use typeORM :) 

1 - Create a File For Your Model , Example : User.ts
```
  import {MongoBaseRepository} from "@mahdi.js/macore/utils/mongo";
  import {CustomSchemaDefinition} from "@mahdi.js/macore/types/mongo";
  
  export interface IUsers {
    name : string
  }
  
  class User extends MongoBaseRepository<IUsers>{

    definition(): CustomSchemaDefinition<IUsers> {
        return {
            name : {type : String , required : true}
        };
    }

    protected initiateIndexes(): void {}
    protected initiatePlugins(): void {}

  }

  export default new User("users")
```
2- End! , Use EveryWhere :)
```
    const users = await User.find({})
```