const sendSuccessResponse = require('../helpers/shared/success-response');
const MetadataService = require('../services/metadata-service');
const catchAsync = require('../utils/catchAsync');
const { SettingEnum } = require('../utils/constants/db-enums');
const { METADATA_TYPES } = require('../utils/constants/generic-constantss');

/**
 * @namespace
 */
const MetadataController = {
  // eslint-disable-next-line no-unused-vars
  getMetaData: catchAsync(async (req, res, next) => {
    let data;
    switch (req.params.type) {
      case METADATA_TYPES.PAWN_TICKETS_STATUS:
        data = MetadataService.getPawnTicketStatusValues();
        break;
      case METADATA_TYPES.INVOICE_PDF_SETTINGS:
        {
          const margin = await MetadataService.findSetting(
            SettingEnum.INVOICE_PDF_MARGIN,
          );
          const pageSize = await MetadataService.findSetting(
            SettingEnum.INVOICE_PDF_SIZE,
          );
          data = {
            margin,
            pageSize,
          };
        }
        break;
      case METADATA_TYPES.APP_FEATURES:
        data = await MetadataService.getAppFeatures();
        break;
    }
    sendSuccessResponse(res, data);
  }),
};

module.exports = MetadataController;
