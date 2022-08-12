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
