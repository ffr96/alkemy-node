# Node JS Challenge - backend.

Repository for _Alkemy's Node backend challenge_.

### The libraries used for the challenge are:

- Express (requested)
- Sequelize (requested)
- bcrypt
- dotenv
- jsonwebtoken
- nodemon (dev dependecy)

Structured like so:

```
app
├── utilities
│   └── config
|       dbcon
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
├── mdw
|   └── tokenValidator
|       errorHandler
|
└── migrations
      └── ...
          ...
```

The app can be tested directly by:

1. install dependecies `npm install`.
2. create an `.env`file with `DB_URL`, `SECRET` and `PORT`.
3. run `npm run dev`.

##########################

### Las librerías utilizadas para el challenge son:

- Express (obligatorio)
- Sequelize (obligatorio)
- bcrypt
- dotenv
- jsonwebtoken
- nodemon (dev dependecy para testeo)
- nodemailer

Estructura del código:

```
app
├── utilities
│   └── config
|       dbcon
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
├── mdw
|   └── tokenValidator
|       errorHandler
|
└── migrations
      └── ...
          ...
```

La aplicación puede ser testeada directamente:

1. instalar dependencias `npm install`.
2. crear un archivo `.env`con los valores `DB_URL`, `SECRET` y `PORT`.
3. iniciar con `npm run dev`.
