import { DatabaseDialect } from './DatabaseDialect';
import { createConnection } from 'typeorm';
import { EasyExpressServer, IEasyExpressAttachableModule } from '@easy-express/server';
import fs from 'fs';

/**
 * A database module connects to the database using the environment variable credentials and
 * loads all TypeORM entities located at the given path.
 * To connect to the database, one can attach this module to an EasyExpress Server
 * or, if they wish to use this module without an EasyExpressServer, they can
 * simply call the connect() method.
 */
export class DatabaseModule implements IEasyExpressAttachableModule {
  private pathToEntities: string;
  private logging: boolean;

  /**
   * Constructs a DatabaseModule that will read the TypeORM entities
   * located at the given path.
   * @param pathToEntities the path to the directory where all TypeORM entities are located in
   * @param logging wherther or not you want this module to log all TypeORM operations
   */
  constructor(pathToEntities: string, logging?: boolean) {
    this.pathToEntities = pathToEntities;
    this.logging = logging !== undefined ? logging : false;
  }

  /**
   * 'Attaches' this module to the given server. There isn't much interaction
   * between this module and an EasyExpressServer, so this method is really only to make
   * module use consistent -- it only calls this.connect().
   * @param server the server to 'attach' to (doesn't matter)
   */
  public attachTo(server: EasyExpressServer): Promise<unknown> {
    return this.connect();
  }

  /**
   * Connects to the database and initializes TypeORM with the entities
   * at the given directory.
   */
  public async connect() {
    const entities: any = await this.loadFiles<any>(this.pathToEntities);
    // refer to https://typeorm.io/#/ to view how to use the connection
    return createConnection({
      host: process.env.DB_HOST!,
      database: process.env.DB_NAME!,
      port: Number(process.env.DB_PORT),
      type: process.env.DB_DIALECT! as DatabaseDialect,
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWD!,
      entities,
      logging: this.logging,
      synchronize: true,
    })
      .then(() => {
        console.log('💡 TypeORM connecged and ready');
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  }

  /**
   * Loads all files inside a given directory and returns them in a list of
   * the given type.
   *
   * @param path the path to a directory containing the files of type <T>
   */
  private async loadFiles<T>(path: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, async (err, filenames) => {
        const typeDefs: T[] = [];

        if (err) {
          reject(err.message);
        }

        for (const filename of filenames) {
          const entity = await import(path + filename);
          typeDefs.push(Object.values(entity)[0] as T);
        }

        resolve(typeDefs);
      });
    });
  }
}
