const Sequelize = require('sequelize');
const { DEVELOPMENT_ENV } = require('./constants/generic-constantss');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    logging: process.env.NODE_ENV === DEVELOPMENT_ENV ? true : false,
    pool: {
      max: 50,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
    timezone: '+00:00',
  },
);

module.exports = sequelize;
