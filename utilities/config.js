require('dotenv').config();

const PORT = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;
const SECRET = process.env.SECRET;

module.exports = { PORT, DB_URL, SECRET };
