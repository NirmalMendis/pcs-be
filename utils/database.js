const Sequelize = require("sequelize");

// Determine the current environment
const env = process.env.NODE_ENV || 'development';

// Import database configuration based on the current environment
const config = require('../config/config.json')[env]; // Update the path to your config.json file

// Initialize Sequelize with imported configuration
const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port || 3306, // Defaulting to 3306 if port is not defined in config
    logging: env === "development" ? console.log : false,
    pool: {
      max: 50,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
    timezone: "+00:00", // Keep or adjust this based on your requirements
  }
);

module.exports = sequelize;
