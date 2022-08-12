const { Sequelize } = require('sequelize');
const { DB_URL } = require('./config');

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectedUnauthorized: false,
    },
  },
});

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
  } catch (e) {
    console.log('Unable to access database');
    process.exit(1);
  }

  return null;
};

module.exports = { sequelize, dbConnect };
