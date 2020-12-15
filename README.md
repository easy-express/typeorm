<h1 align="center">Welcome to Easy-Express 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@easy-express/server" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@easy-express/server.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A module that implements TypeORM to let you easily connect and manage your database in conjunctionw with an Easy-Express Server.

### 🏠 [Homepage](https://github.com/leonardparisi/easy-express-server#readme)

## Introduction

This module does not require much interaction. You simply create it and attach it to your server, and your TypeORM connection is set!

## Install

```sh
npm install @easy-express/db
```

## Setup

First, add the following environment variables (you can use a .env file):

```sh
DB_HOST='HOST'
DB_NAME='DATABASE_NAME'
DB_PORT=DATABASE_PORT
DB_USER=DATABASE_USERNAME
DB_PASSWD=DATABASE_PASSWORD
DB_DIALECT= 'mysql' | 'mssql' | 'sqlite' | 'postgres' | 'mariadb' | 'mongodb' (fill in the one you are using)
```

Next, run the `generate_entities.sh` script to generate the entities from your database using the credentials from your .env file. The entities will be placed into your src directory.

Finally, add the following compiler options to your tsconfig.json:

```json
{
  "compilerOptions": {
    // ...
    "strictPropertyInitialization": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
    // ...
  }
}
```

## Usage

Once you've completed the setup above, you can create a new DatabaseModule and attach it to your Easy-Express Server. Once that's done, you can use [TypeORM](https://typeorm.io/#/) as one normally would.

### Example

    import { EasyExpressServer } from  "@easy-express/server";

    // Create a new server

    let  server = new  EasyExpressServer();

    // Define a 'get' route

    server.instance.get("/", (req, res) => {

    res.send("Hello World!");

    });

    // Start the server

    server.start();

## Modules

Coming soon...

## Author

👤 **Leonard Parisi**

- Website: leonardparisi.com
- Github: [@leonardparisi](https://github.com/leonardparisi)
- LinkedIn: [@https:\/\/www.linkedin.com\/in\/lenny-parisi\/](https://linkedin.com/in/https://www.linkedin.com/in/lenny-parisi/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/leonardparisi/easy-express-server/issues). You can also take a look at the [contributing guide](ssh://git@github.com:leonardparisi/easy-express-sequelize/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
