<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <h1 align="center">Macore</h1>
</p>

**Note: If You Want To Run Server in benesf.ir change serverConfigure[bin/index.js] To Https**

### `npm run init`
**Note: Init Admin & User Data : Username : 09369514975 | Password : 123456**

### `npm run dev`
**You Can Use This Mode For Send Token in Header Insteadof Send Token in Cookies**

# Api (25 Rest API) {new : Slider}

### `Register (POST) (/api/v1/register)`
Body : 
* uName : String (Required)
* uLastName : String (Required)
* uPhoneNumber : String (Required)
* uPassword : String (Required)
* uEmail

```
Response : {
    "limitedToken": ""
}
```
**Save limitedToken In our native db or localstorage for Next Part (Verify)**

### `Verify (POST) (/api/v1/verify) ` 
* limitedToken : "You received this value in the previous step" HEADER || COOKIES
* SmsCode : String (Required) BODY

Response 
* Token : ""


### `Login (POST) (/api/v1/login) ` 
* uPhoneNumber : String (Required), 
* uPassword : String (Required), 

Response 
* Token : ""


### `ChangePassword/SendSms (POST) (/api/v1/ChangePassword/SendSms)` 
* uPhoneNumber : String (Required)
```
Response : {
    "limitedToken": ""
}
```
**Save limitedToken In our native db or localstorage for Next Part (ChangePassword/Verify)**

### `ChangePassword/Verify (POST) (/api/v1/ChangePassword/Verify) ` 
* limitedToken : "You received this value in the previous step" HEADER || COOKIES
* SmsCode : String (Required) || BODY


### ` ChagePassword/CheckTokenAndSetPassword (POST) (/api/v1/ChangePassword/CheckTokenAndSetPassword) `
* limitedToken : "You received this value in the previous step" HEADER || COOKIES
* NewPassword : String (Required)

*** We Will Not Get You Token in this step ***

### `CheckToken (POST) (/api/v1/CheckToken) `
* Token : String (Required) || req.cookies.Token || req.cookies.limitedToken

### `Profile (POST) (/api/v1/Profile) `
* Header | Cookies : { Token : String (Required) }
* Body : { uPhoneNumber : String }

### `EditProfile (POST) (/api/v1/EditProfile)`
* {UseCredentials}
* uName Or uLastName Or uBirthday(1379/10/04) OR uAddress
Example :
```
    {
        uName : 'John' , 
        uBirthday : '1370/04/22'
    }
```

### `Logout (DELETE) (/api/v1/Logout) `
* {UseCredentials}

### `Products (POST & GET) (/api/v1/Products/child) [For Get All Products]`
* search : String 
* provider : String (Provider English Name)
* category : String (Category English Name)
* categoryChild : String (Category Child English Name)
* brand : String (This Category Brand)
* min : Number
* max : Number
* page : Number
* sort : date | BuyCount | ViewCount
```
Example : /api/v1/Products/mobile {
    search : 'گلک',
    brand : ["sumsung" , "hp"] ,
    available : true ,
    min : 50000000 
}
```
```
Response
status : 200 , 
    message : '' ,
    data : {
        "Products" : {
            "docs" : [returnedProducts]
            "total": 1,
            "limit": 20,
            "page": 1,
            "pages": 1
        } ,
        "Categories" : {
            "subCategory": "electronic-devices",
            "childs": [
                {
                    "PersianName": "لب تاب",
                    "EnglishName": "laptop"
                },
                {
                    "PersianName": "گوشی",
                    "EnglishName": "mobile"
                }
            ]
        } ,
        "Brands" : [
            { name : "hp" } , { name : "sumsung" }
        ]
    }
}
```

### `Product (POST) (/api/v1/Product) [For Get a Product]`
Use EnglishTitle Or id
* EnglishTitle : String
* id : String

```
Response : {
    InterView : [
        {
            "shortIntro": "",
            "image": ""
        },
        {
            "desc1": "",
            "thumbnail": ""
        },
        {
            "desc2": "",
            "thumbnail": ""
        }
    ] , 
    Features : [
        {key : "" , value : ""}
    ]
}
```

### `Comments (GET) (/api/v1/Comments/:EnglishName) [For Get Comments Of A Products]`
* No body just use : /api/v1/Comments/:EnglishName

### `newComment (POST) (/api/v1/newComment) [For Post A New Comment]`
* {Use Credential}
* productEnglishName ,
* Body

### `Request Product (POST) (/api/v1/RequestProduct) [For Suggest a Product]`
* {Use Credential}
* productName : String (Required)
* familiar : String

### `Cart (POST) (/api/v1/Cart) [For Add Product To Cart(Basket)]`
{useCredential}
* EnglishName : String (Require)

### `Cart (GET) (/api/v1/Cart) [For Get Cart]`
{useCredential}
Response : 
* Title : (Persian Title)
* productName : (English Title)
* count : (Count Off this in Basket)

### `Cart (PATCH) (/api/v1/Cart) [For Delete A Product From Cart]`
{useCredential}
* EnglishName : String (Require)
* operation : mm Or pp (mm = -- And pp = ++)
**if count == 1 this is Usually delete from cart**

### `CreateOrder (POST) (/api/v1/CreateOrder) [For Send Order Detail And Get Api For Payment]`
{useCredential}
* price : Number
* address : String (Required)
* name : String
* lastName : String
* phoneNumber1 : String 
* phoneNumber2 : String
```
Response : {
    "data": {
        "TokenForStartPayment": "bb1ce0a8e6f35cea78404e211363e904",
        "UrlForStartPayment": "/api/v1/bb1ce0a8e6f35cea78404e211363e904"
    }
}
```
**Redirect To This Address : /api/v1/StartPayment/{TokenForStartPayment} **

### `Start Payment (GET[Redirect]) `
* forExample : http://benesf.ir:4750/api/v1/StartPayment/bb1ce0a8e6f35cea78404e211363e904

### `Page (GET) (/api/v1/Page/:pageName) [For Get A Page Title And Body]`
* For Example : http://benesf.ir:4750/api/v1/Page/about
initPages : about - contact
```
    Response : {
        pageName : "English Title" ,
        pageTitle : 'Persian Title' , 
        pageBody : 'Body (Description)'
    }
```

### `Slider (GET) (/api/v1/Slider) [For Get Slider For HomePage]`
* No Body Just Get it
```
    Response : {
        Sliders : [] // This is For Slider
        constantSlider1 : '' , // Right Slider 1 
        constantSlider2 : '' , // Right Slider 2
    }
```

### `Persences (GET) (/api/v1/Persences) [For Get All Available Persences]`
* {Use Credential}

### `reservePersence (POST) (/api/v1/reservePersence) [For Reserve A Persence]`
* {Use Credential}
* date : "1396/03/10" (String)
* time : 10 (Int)

### `Slider (GET) (/api/v1/Slider) [For Get HomePage Slider Pics]`
```
    Response : {
        data : {
            Sliders : [
                '' , '' , '' //This is Just Threesome
            ] , 
            constantSlider1 : '' , 
            constantSlider2 : ''
        }
    }
```

# Backend Codes Helper

### `global UTILS`

* get : alias => find(params , option)
* getOne : alias => findOne(params , option)
* set : alias => updateOne(params , SetTo)
* new : alias => new db(params)
* delOne : alias => deleteOne(params)

```
Example -> 
    async function GetProduct(){
        await UTILS.get('Product' , {'Title' : 'MyTitle'})
    }
```

### `global FUNC`

* zeroValidator (PhoneNumber) => Convert Imported Arg To PhoneNumber Whitout 0
* GenerateIntroduceCode (count) => Get A Count And Return a unique code
* jwtSign (params) CALLBACK(err , result) => Convert Params To Jwt
* decodeJWT (token) CALLBACK(err , result) => Parse token in Argument
* ApiResponse (res , status , message , data = [] ) => For Get Response To Api

### `global CONSTANT`
This is Just Return A Persian Name For Response in Panel And In API

### `global LOGGER`
This is Logger Of Project 
We Use Morgan And Winston Together
Example : 
```
    LOGGER.info()
    LOGGER.error()
    LOGGER.warn()
```