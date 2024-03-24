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
