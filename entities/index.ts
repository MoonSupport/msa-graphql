import { createConnection, EntitySchema, getConnectionOptions } from "typeorm";
export { Book } from "./Book";
export { Author } from "./Author";

interface MyDBSetting {
  entities: string | Function | EntitySchema<any>;
}

export const initDB = async ({ entities }: MyDBSetting) => {
  const connectionOptions = await getConnectionOptions(); // default connection options in ormconfig.json

  const options = Object.assign(connectionOptions, {
    entities,
  });

  return await createConnection(options);
};
