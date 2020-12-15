import { DatabaseDialect } from './DatabaseDialect';
import { createConnection } from 'typeorm';
import { EasyExpressServer, IEasyExpressAttachableModule } from '@easy-express/server';

export class DatabaseModule implements IEasyExpressAttachableModule {
  private database: string;
  private username: string;
  private password: string;
  private host: string;
  private dialect: DatabaseDialect;
  private port?: number;
  private entities: any[];

  constructor(
    database: string,
    username: string,
    password: string,
    host: string,
    dialect: DatabaseDialect,
    entities: any[],
    port?: number,
  ) {
    this.database = database;
    this.username = username;
    this.password = password;
    this.host = host;
    this.dialect = dialect;
    this.port = port;
    this.entities = entities;
  }

  public attachTo(server: EasyExpressServer): Promise<unknown> {
    return this.connect();
  }

  private async connect() {
    console.log('🔌 Connecting to database...');
    // refer to https://typeorm.io/#/ to view how to use the connection
    return createConnection({
      type: this.dialect,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: this.entities,
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
