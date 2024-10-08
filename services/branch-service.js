const Branch = require('../models/branch');
const { SequelizeOptionsType } = require('../utils/types');
const { BranchType } = require('../models/branch');
const logger = require('../utils/logger');

/**
 * @namespace
 */
const BranchService = {
  /**
   *
   * @param  {SequelizeOptionsType} options
   * @returns {Promise<(BranchType | void)>}
   */
  findBranch: async (...options) => {
    try {
      /**
       * @type {BranchType}
       */
      const branch = await Branch.findOne(...options);
      return branch;
    } catch (error) {
      if (options.transaction) {
        await options.transaction.rollback();
      }
      logger.error('findBranch', error);
      throw error;
    }
  },
};

module.exports = BranchService;
