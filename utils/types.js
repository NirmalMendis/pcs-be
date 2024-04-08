const { Transaction } = require('sequelize');

/**
 * @typedef {Object} SequelizeOptionsType
 * @property {Transaction} [transaction]
 */

/**
 * @typedef {Transaction} SequelizeTransactionType
 */

/**
 * @typedef {Object} AssociationOptionsType
 * @property {Object} [include]
 * @property {Object} [where]
 */

/**
 * @typedef {Object} AddressType
 * @property {string} addressLine1
 * @property {string} addressLine2
 * @property {string} addressLine3
 * @property {string} city
 * @property {string} postalCode
 */

/**
 * @typedef {Object} SinglePermissionType
 * @property {string} title
 * @property {string} category
 */

/**
 * @typedef {Object} PermissionsType
 * @property {Array<SinglePermissionType>} view
 * @property {Array<SinglePermissionType>} create
 * @property {Array<SinglePermissionType>} update
 * @property {Array<SinglePermissionType>} delete
 */

/**
 * @typedef {Object} GoldItemType
 * @property {number} caratage
 * @property {number} weight
 */

/**
 * @typedef {Object} VehicleItemType
 * @property {string} vehicleNo
 */
