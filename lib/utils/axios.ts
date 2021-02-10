import axios from 'axios'

export enum Request_Methods {
  POST = "post" ,
  GET = "get" ,
  DELETE = "delete" ,
  patch = "patch"
}

export async function 
  axiosSendRequest<IRequest , IResponse>(
    url : string , headers : any|null , method : Request_Methods , params : IRequest|any) : Promise<any|IResponse> {

    return new Promise((resolve , reject) => {
      axios({
        url ,
        headers ,
        method ,
        params
      }).then(data => {
        resolve(data.data)
      })
      .catch(err => reject(err))
    })

}