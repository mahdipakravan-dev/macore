import { I18next } from "i18next-express-middleware";

export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

export interface CustomObject {
    [key: string]: any;
}