import { EntitySchema } from "typeorm";
export { Book } from "./Book";
export { Author } from "./Author";
interface MyDBSetting {
    entities: string | Function | EntitySchema<any>;
}
export declare const initDB: ({ entities }: MyDBSetting) => Promise<import("typeorm").Connection>;
