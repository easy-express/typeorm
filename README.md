<h1 align="center">Welcome to Easy-Express 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@easy-express/server" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@easy-express/server.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A module to implement DB functionality for an Easy-Express Server.

### 🏠 [Homepage](https://github.com/leonardparisi/easy-express-server#readme)

## Introduction

....

## Install

```sh
npm install @easy-express/sequelize
```

## Usage

Note: You must put all sequelize models inside ./src/database_models

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
