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

export class PassportError extends ClientError {
  constructor(error: ClientError, statusCode = 401, name = "unAuthorized") {
    super (error.status || statusCode, error.name || name, error.details, error.message);
  }
}

export class RequiredAdaptor extends InternalServerError {
  constructor(adaptor: string) {
    super(`${adaptor}_IS_REQUIRED`, `You must add ${adaptor} as required adaptor in your 'APP' constructor`);
  }
}

export class RequiredConfig extends InternalServerError {
  constructor(adaptor: string) {
    super(`CONFIG_FOR_${adaptor}_IS_REQUIRED`,
      `You must define ${adaptor} definition in your 'APP' constructor as a 'ConfigurableAdaptor'.
       You must Also set proper config in it.`);
  }
}
