const sendSuccessResponse = require('../helpers/shared/success-response');
const MetadataService = require('../services/meta-data-service/metadata-service');
const catchAsync = require('../utils/catchAsync');
const { METADATA_TYPES } = require('../utils/constants/generic-constantss');

/**
 * @namespace
 */
const MetadataController = {
  getMetaData: catchAsync(async (req, res) => {
    let data;
    switch (req.params.type) {
      case METADATA_TYPES.PAWN_TICKETS_STATUS:
        data = MetadataService.getPawnTicketStatusValues();
    }
    sendSuccessResponse(res, data);
  }),
};

module.exports = MetadataController;
