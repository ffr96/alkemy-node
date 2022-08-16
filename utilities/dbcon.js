const Sequelize = require('sequelize');
const { DB_URL } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectedUnauthorized: false,
    },
  },
});

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const doMigrations = async () => {
  const migrate = new Umzug(migrationConf);

  const migrations = await migrate.up();
  console.log('Migrations are up to date', {
    files: migrations.map((m) => m.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    await doMigrations();
    console.log('Connected to the database');
  } catch (e) {
    console.log(e);
    console.log('Unable to access database');
    process.exit(1);
  }

  return null;
};

module.exports = { sequelize, dbConnect, rollbackMigration };
