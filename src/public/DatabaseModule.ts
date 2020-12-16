import { DatabaseDialect } from './DatabaseDialect';
import { createConnection } from 'typeorm';
import { EasyExpressServer, IEasyExpressAttachableModule } from '@easy-express/server';
import fs from 'fs';

export class DatabaseModule implements IEasyExpressAttachableModule {
  private pathToEntities: string;
  private logging: boolean;

  constructor(pathToEntities: string, logging?: boolean) {
    this.pathToEntities = pathToEntities;
    this.logging = logging !== undefined ? logging : false;
  }

  public attachTo(server: EasyExpressServer): Promise<unknown> {
    return this.connect();
  }

  private async getEntities() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.pathToEntities, async (err, filenames) => {
        const entities: any[] = [];

        if (err) {
          reject(err.message);
        }

        for (const filename of filenames) {
          const entity = await import(this.pathToEntities + filename);
          entities.push(Object.values(entity)[0]);
        }

        resolve(entities);
      });
    });
  }

  private async connect() {
    const entities: any = await this.getEntities();
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
        console.log('💡 Connected to database!');
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  }
}
