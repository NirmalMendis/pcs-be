const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const httpServer = require('http').createServer(app);

const { sequelize } = require('./utils/database');
// eslint-disable-next-line no-unused-vars
const associations = require('./utils/associations');
const logger = require('./utils/logger');

const port = process.env.PORT || 3001;

sequelize
  //  .authenticate()
  .sync({
    force: true,
  })
  .then(() => {
    // eslint-disable-next-line no-unused-vars
    const server = httpServer.listen(port, () => {
      logger.info(`PCS API started and listening on port ${process.env.PORT}`);
    });
  });
