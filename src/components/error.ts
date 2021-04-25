import { CustomObject } from "../types/global";

export default class ClientError {
  status = 400;
  name = "";
  message: string | undefined;
  details: CustomObject | undefined = undefined;

  /**
   * @param status : status code
   * @param name : error type
   * @param message : message received from server
   * @param details : detail on error
   */
  constructor(status: number, name: string, details?: CustomObject, message?: string) {
    this.status = status;
    this.name = name;
    this.message = message;
    if (!!details) {
      this.details = details;
    }
    else {
      this.details = undefined;
    }
    console.error({error: this});
  }
}

export class InternalServerError extends ClientError {
  constructor(name: string, message: string, details?: any) {
    super(500, name, details, message);
  }
}
