const Branch = require('../models/branch');
const DbFactoryService = require('../services/db-factory-service');

/**
 * @namespace
 */
const BranchController = {
  getAllBranches: DbFactoryService.getAll(Branch),
};

module.exports = BranchController;
