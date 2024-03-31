const {
  PawnTicketStatusEnum,
  SettingEnum,
} = require('../utils/constants/db-enums');
const { SettingType } = require('../models/setting');
const { FeatureType } = require('../models/feature');
const Setting = require('../models/setting');
const Feature = require('../models/feature');

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
     * @type {SettingType}
     */
    const setting = await Setting.findOne({
      where: {
        settingType: settingType,
      },
    });
    return setting;
  },
  /**
   *
   * @returns {Promise<(Array<FeatureType> | void)>}
   */
  getAppFeatures: async () => {
    /**
     * @type {Array<FeatureType>}
     */
    const features = await Feature.findAll({
      where: {
        value: true,
      },
    });
    return features;
  },
};

module.exports = MetadataService;
