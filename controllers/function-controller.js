const Function = require('../models/function');
const DbFactoryService = require('../services/db-factory-service');

/**
 * @namespace
 */
const FunctionController = {
  getFunctions: DbFactoryService.getAll(Function),
};

module.exports = FunctionController;
