const Branch = require('../models/branch');
const sequelize = require('../utils/database');
const { SequelizeOptionsType } = require('../utils/types');
const { BranchType } = require('../models/branch');

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
      if (!options.transaction) {
        options.transaction = await sequelize.transaction();
      }
      /**
       * @type {BranchType}
       */
      const branch = await Branch.findOne(...options);
      return branch;
    } catch (error) {
      if (options.transaction) {
        await options.transaction.rollback();
      }
      throw error;
    }
  },
};

module.exports = BranchService;
