const { PawnTicketStatusEnum } = require('../utils/constants/db-enums');

/**
 * @namespace
 */
const MetadataService = {
  /**
   *
   * @returns {PawnTicketStatusEnum}
   */
  getPawnTicketStatusValues: () => {
    return Object.keys(PawnTicketStatusEnum).map(
      (key) => PawnTicketStatusEnum[key],
    );
  },
};

module.exports = MetadataService;
