const app = require("./app");
const httpServer = require("http").createServer(app);
const sequelize = require("./utils/database");
// const associations = require("./utils/associations");

// Determine the environment and load the configuration
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env]; // Todo read from env

const port = config.port || 3001; // Use port 3001

sequelize
  .sync({ force: true })
  .then((result) => {
    const server = httpServer.listen(port, () => {
      console.log(`PCS API started and listening on port ${port}`);
    });
  });
