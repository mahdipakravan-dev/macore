<p align="center">
  <a href="http://macore.ir" target="blank"><img src="https://s16.picofile.com/file/8424560968/profile_pic.png" width="120" alt="Mahdi Pakravan مهدی پاکروان" /></a>
  <h1 align="center">Macore <span>(Mahdi Nodejs Core)</span></h1>
</p>


## Description (V 0.0.7)

Macore is a framework for building <b>easy , fast and MultiLangual</b> <a href="http://nodejs.org" target="_blank">Node.js</a> server-side applications. It uses modern JavaScript, is built with  <a href="http://www.typescriptlang.org" target="_blank">TypeScript</a> and combines elements of OOP (Object Oriented Programming), FP (Functional Programming) , DP (Design Patterns)

<p>Under the hood, Macore makes use of <a href="https://expressjs.com/" target="_blank">Express</a> .

## Table Of Macore Features

- [Quick Start](#quick-start)
- [Router](#router)
- [Utilities](#utilities)
    - [Validation](#validation)
    - [ApiService](#apiservice)
    - [Chalk](#chalk)
    - [MultiLingual](#multilingual)
- [ORM](#orm)
- [Payment](#payment)
  - [Custom Payment](#payment-custom)
  - [Vandar](#payment-vandar)

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

### `MultiLingual`
**Create MultiLingual Server-side App Easssssyyyy**
1 - Config : this example for an english + spanish Server-side app
```
  new App(... , {
    lng : "en" ,
    fallbackLng : "en" ,
    preload : ["en" , "es"] ,
    saveMissing : false ,
    load : "languageOnly" ,
    resources : {
      en : {translation : {"greeting" : "Hello {{name}}" , 
      es : {translation : {"greeting" : "Hallo {{name}}  "}}
    }
  })
```
2 - Use it Using <b>app.t</b> Function
```
  app.t(
    "greeting" ,
    "en" , //This Lang
    {name : "Mahdi"}   // For pass Value Of {{name}}
  )
```

<br/>

> Also You Can Use it as Middleware or something else
For Example , This is Your Middleware
```
  function (req , res , next) {
    this.app.changeLanguage(req.query.lang || "en")
  }
```
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

## Payment
i Created an StrategyPattern For Implement any Payment inside your code easily 

### `Vandar Payment`
> First Put Below Configuration inside your .env file
```
  (.ENV)
      VANDAR_GET_TOKEN_URL=https://ipg.vandar.io/api/v3/send
      VANDAR_TRANSACTION_URL=https://ipg.vandar.io/api/v3/send
      VANDAR_TRANSACTION_URL=https://ipg.vandar.io/api/v3/transaction
      VANDAR_VERIFY_URL=https://ipg.vandar.io/api/v3/verify
      VANDAR_CALLBACK_URL=/
      VANDAR_API_KEY=
```
```
  (Your Code)
      import {VandarPaymentStrategy} from "../src/utils/Payment/vandar/vandar";
      
      const VandarPayment = new VandarPaymentStrategy()
      VandarPayment.getToken({factorNumber : "test" , amount : 10000}) // Return A Token
      VandarPayment.verify({token : "123"})
      VandarPayment.transaction({token : "123"})
```

### `Custom Payment`

```
  class customPayment extends PaymentStrategy<
      IToken , OToken ,
      ITransaction , OTransaction ,
      IVerify , OVerifyany
  >{

    getToken(payload: IToken): OToken {}

    transaction(payload: ITransaction): OTransaction {}

    verify(payload: IVerify): OVerify {}

  }

```