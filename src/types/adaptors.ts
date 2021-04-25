import App from "../components/app";

export abstract class Adaptor {
  constructor(
    protected app : App
  ){}

  abstract init<T>() : T | any | Promise<any | T>
}

export type AdaptorDefinition = {new (app:App) : Adaptor}