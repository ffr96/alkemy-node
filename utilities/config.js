require('dotenv').config();

const PORT = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;
const SECRET = process.env.SECRET;
const EMAIL = process.env.MAIL_USERNAME;
const PASSWORD = process.env.MAIL_PASSWORD;

module.exports = { PORT, DB_URL, SECRET, EMAIL, PASSWORD };
