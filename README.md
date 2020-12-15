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

## Model generation

```sh
npx typeorm-model-generator -h HOST -d DATABASE -u USER -x PASSWORD -p PORT -e DB_DIALECT -o OUTPUT_DIR
```

## Usage

First, generate the models for TypeORM using the command above. Once they're generated, you can create a new DatabaseModule and attach it to your Easy-Express Server to connect it to the database. Once that's done, you can use [TypeORM](https://typeorm.io/#/) as one normally would.

Also, you need to add the following compiler options to your tsconfig.json:

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
