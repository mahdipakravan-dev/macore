import { Schema, SchemaType, SchemaTypeOpts } from "mongoose";
import { RequiredKeys } from "./global";

export type CustomSchemaDefinition<T>  = {
    [key in Exclude<RequiredKeys<T>, "createdAt" | "updatedAt" >]: SchemaTypeOpts<any> | Schema | SchemaType;
};

export type DeleteResponse = { ok?: number | undefined, n?: number | undefined };