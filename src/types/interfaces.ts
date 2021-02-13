export enum Request_Methods {
    POST = "post" ,
    GET = "get" ,
    DELETE = "delete" ,
    patch = "patch"
}

export interface ORM<T>{
    create(data:any) : Promise<T>
    find(data:any) : any
}