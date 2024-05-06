const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'sequelizemeta',
    seederStorageTableName: 'sequelizedata',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'sequelizemeta',
    seederStorageTableName: 'sequelizedata',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'sequelizemeta',
    seederStorageTableName: 'sequelizedata',
  },
};
