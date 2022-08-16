# Node JS Challenge - backend.

Repository for _Alkemy's Node backend challenge_.

### The libraries used for the challenge are:

- Express (requested)
- Sequelize (requested)
- bcrypt
- dotenv
- jsonwebtoken
- nodemailer
- umzug (for migrations)
- nodemon (dev dependecy)

Structured like so:

```
app
├── utilities
│   └── config
|       dbcon
|       doRollback
|
├── routes
│   └── characters
|       genre
|       movies
|       auth
│        └── login
│            register
│
├── models
|    └── index
|        character
|        genre
|        movie
|        user
|        moviescharacters
|        genresmovies
|
├── mdw
|   └── tokenValidator
|       errorHandler
|
└── migrations
      └── 2022...
          2022...
```

The app can be tested directly by:

1. install dependecies `npm install`.
2. create an `.env`file with `DB_URL`, `SECRET` and `PORT`.
3. run `npm run dev`.

### Documentation on [POSTMAN](https://documenter.getpostman.com/view/22824785/VUjTmPey)

Some _examples_ might be off but parameters/routes/etc should be fine.

---

## Las librerías utilizadas para el challenge son:

- Express (obligatorio)
- Sequelize (obligatorio)
- bcrypt
- dotenv
- jsonwebtoken
- nodemailer
- umzug (para migración)
- nodemon (dev dependecy para testeo)

Estructura del código:

```
app
├── utilities
│   └── config
|       dbcon
|       doRollback
|
├── routes
│   └── characters
|       genre
|       movies
|       auth
│        └── login
│            register
│
├── models
|    └── index
|        character
|        genre
|        movie
|        user
|        moviescharacters
|        genresmovies
|
├── mdw
|   └── tokenValidator
|       errorHandler
|
└── migrations
      └── 2022...
          2022...
```

La aplicación puede ser testeada directamente:

1. instalar dependencias `npm install`.
2. crear un archivo `.env`con los valores `DB_URL`, `SECRET` y `PORT`.
3. iniciar con `npm run dev`.

# Documentación en [POSTMAN](https://documenter.getpostman.com/view/22824785/VUjTmPey)

_Algunos_ ejemplos están incorrectos pero los parámetros/rutas/etc deberían ser correctos.
