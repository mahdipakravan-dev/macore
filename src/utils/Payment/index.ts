/*
* Behavioral : Strategy Design Pattern
* */

export abstract class PaymentStrategy<
    IToken , OToken ,
    ITransaction , OTransaction ,
    IVerify , OVerify
    >{
    abstract getToken(payload : IToken): OToken;

    abstract transaction(payload : ITransaction) : OTransaction

    abstract verify(payload : IVerify) : OVerify
}