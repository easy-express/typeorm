import { EasyExpressServer, IEasyExpressAttachableModule } from '@easy-express/server';
import { DatabaseDialect } from './DatabaseDialect';

export class DatabaseModule implements IEasyExpressAttachableModule {
  private database: string;
  private username: string;
  private password: string;
  private host: string;
  private dialect: DatabaseDialect;
  private port?: number;

  constructor(
    database: string,
    username: string,
    password: string,
    host: string,
    dialect: DatabaseDialect,
    port?: number,
  ) {
    this.database = database;
    this.username = username;
    this.password = password;
    this.host = host;
    this.dialect = dialect;
    this.port = port;
  }

  public attachTo(server: EasyExpressServer): void {
    throw new Error('Method not implemented.');
  }
}
