const express = require('express');
const { PORT } = require('./utilities/config');
const { dbConnect } = require('./utilities/dbcon');
const tokenValidator = require('./mdw/tokenValidator');

const genreRouter = require('./routes/genre');
const characterRouter = require('./routes/characters');
const moviesRouter = require('./routes/movies');
const loginRouter = require('./routes/auth/login');
const registerRouter = require('./routes/auth/register');
const errorHandler = require('./mdw/errorHandler');

const app = express();
app.use(express.json());
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/register', registerRouter);

app.use(tokenValidator);
app.use('/api/characters', characterRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/genres', genreRouter);
app.use(errorHandler);

const startServer = async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
};

startServer();
