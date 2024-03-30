const {
  PawnTicketStatusEnum,
  SettingEnum,
} = require('../utils/constants/db-enums');
const { SettingType } = require('../models/setting');
const Setting = require('../models/setting');

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
  /**
   *
   * @param  {SettingEnum} settingType
   * @returns {Promise<(SettingType | void)>}
   */
  findSetting: async (settingType) => {
    /**
     * @type {SettingEnum}
     */
    const setting = await Setting.findOne({
      where: {
        settingType: settingType,
      },
    });
    return setting;
  },
};

module.exports = MetadataService;
