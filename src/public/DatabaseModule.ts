import { DatabaseDialect } from './DatabaseDialect';
import { createConnection } from 'typeorm';
import { EasyExpressServer, IEasyExpressAttachableModule } from '@easy-express/server';

export class DatabaseModule implements IEasyExpressAttachableModule {
  private entities: any[];
  private logging: boolean;

  constructor(entities: any[], logging?: boolean) {
    this.entities = entities;
    this.logging = logging !== undefined ? logging : false;
  }

  public attachTo(server: EasyExpressServer): Promise<unknown> {
    return this.connect();
  }

  private async connect() {
    // refer to https://typeorm.io/#/ to view how to use the connection
    return createConnection({
      host: process.env.DB_HOST!,
      database: process.env.DB_NAME!,
      port: Number(process.env.DB_PORT),
      type: process.env.DB_DIALECT! as DatabaseDialect,
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWD!,
      entities: this.entities,
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
