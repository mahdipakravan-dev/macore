/* Token */

export interface IToken_Vandar {
    amount : number ,
    factorNumber : string
}

export interface OToken_Vandar {
    status : number
    errors ?: string[]
    token ?: string
}


/* Transaction */

export interface ITransaction_Vandar {
    token:string
}

export interface OTransaction_Vandar {
    status : number
    amount ?: string ,
    transId ?:  number,
    refnumber ?: string ,
    trackingCode ?: string ,
    factorNumber ?: string,
    mobile ?: string,
    description ?: string ,
    cardNumber ?: string ,
    CID ?: string ,
    paymentDate ?: string ,
    message ?: string
    token ?: string
    errors ?: string[]
}

/* Verify */

export interface IVerify_Vandar {
    token:string
}

export interface OVerify_Vandar {
    status: number
    amount ?: string
    realAmount ?: number
    wage ?: string
    transId ?: number
    factorNumber ?: string
    mobile ?: string
    description ?: string
    cardNumber ?: string
    paymentDate ?: string
    cid ?: string ,
    message ?: string
}
