import { DatabaseDialect, isDatabaseDialect } from './DatabaseDialect';
import { Connection, createConnection } from 'typeorm';
import type { BaseConnectionOptions } from "typeorm/connection/BaseConnectionOptions";
import { EasyExpressServer, IEasyExpressAttachableModule } from '@easy-express/server';

type Migrations = BaseConnectionOptions["migrations"];

/**
 * A database module connects to the database using the environment variable credentials and
 * loads all TypeORM entities located at the given path.
 * To connect to the database, one can attach this module to an EasyExpress Server
 * or, if they wish to use this module without an EasyExpressServer, they can
 * simply call the connect() method.
 */
export class DatabaseModule implements IEasyExpressAttachableModule {
  private pathToEntities: string;
  private migrations: Migrations;
  private logging: boolean;

  /**
   * Constructs a DatabaseModule that will read the TypeORM entities
   * located at the given path.
   * @param pathToEntities the path to the directory where all TypeORM entities are located in. Supports glob patterns
   * @param logging whether or not you want this module to log all TypeORM operations
   */
  constructor(pathToEntities: string, migrations?: Migrations, logging?: boolean) {
    this.pathToEntities = pathToEntities;
    this.migrations = migrations;
    this.logging = logging ?? false;
  }

  /**
   * 'Attaches' this module to the given server. There isn't much interaction
   * between this module and an EasyExpressServer, so this method is really only to make
   * module use consistent -- it only calls this.connect().
   * @param server the server to 'attach' to (doesn't matter)
   */
  public attachTo(server: EasyExpressServer): Promise<Connection> {
    return this.connect();
  }

  /**
   * Connects to the database and initializes TypeORM with the entities
   * at the given directory.
   */
  public async connect(): Promise<Connection> {
    this.verifyAllInputs();

    // refer to https://typeorm.io/#/ to view how to use the connection
    return createConnection({
      host: process.env.DB_HOST!,
      database: process.env.DB_NAME!,
      port: Number(process.env.DB_PORT),
      type: process.env.DB_DIALECT! as DatabaseDialect,
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWD!,
      entities: [this.pathToEntities],
      logging: this.logging,
      synchronize: false,
      migrations: this.migrations
    })
      .then((connection) => {
        console.log('💡 TypeORM connected and ready');
        return connection;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  }

  private verifyAllInputs() {
    if (process.env.DB_HOST === undefined) {
      throw new Error("Environment variable 'DB_HOST' is undefined.");
    } else if (process.env.DB_NAME === undefined) {
      throw new Error("Environment variable 'DB_NAME' is undefined.");
    } else if (process.env.DB_PORT === undefined) {
      throw new Error("Environment variable 'DB_PORT' is undefined.");
    } else if (process.env.DB_DIALECT === undefined) {
      throw new Error("Environment variable 'DB_DIALECT' is undefined.");
    } else if (!isDatabaseDialect(process.env.DB_DIALECT)) {
      throw new Error(`Environment variable 'DB_DIALECT' (value: ${process.env.DB_DIALECT}) is not a valid Database Dialect.`);
    } else if (process.env.DB_USER === undefined) {
      throw new Error("Environment variable 'DB_USER' is undefined.");
    } else if (process.env.DB_PASSWD === undefined) {
      throw new Error("Environment variable 'DB_PASSWD' is undefined.");
    }

    if (isNaN(Number(process.env.DB_PORT))) {
      throw new Error("Environment variable 'DB_PORT' is not a number.");
    }
  }
}
