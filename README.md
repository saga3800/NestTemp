<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description
Proyecto base para la construcción de microservicios [Nest](https://github.com/nestjs/nest) con lineamientos clean architecture

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

El presente proyecto se implementa cómo código base para la implementación de microservicios usando el framework [Nest](https://github.com/nestjs/nest) con lineamientos clean architecture. Se crean clases base y se referencian librerías básicas para su funcionamiento.

## Módulos del proyecto:

- common
  Módulo transversal en el cual se define la configuración, librerías, enumeradores, útilidades.

- controller
  Modulo en el cual se definen los paths o funcionalidades que expone el servicio

- core
  Módulo en el cual se implementa la lógica de negocio (use cases)

- data provider
  Módulo que controla la conexión a legados, base de datos y servicios con los cuales se tiene comunicación


## Stay in touch

- Author - [Oscar Alvarez](https://kamilmysliwiec.com)

## License

Nest is [MIT licensed](LICENSE).
