const { BranchType } = require('../../../models/branch');
const { UserType } = require('../../../models/user');

/**
 * @typedef {Object} WelcomeEmailTemplateDataType
 * @property {BranchType} branch
 * @property {string} redirectURL
 * @property {UserType} user
 */

/**
 * A function that greets a user.
 * @param {WelcomeEmailTemplateDataType} data - The user object.
 */
const welcomeTemplate = (data) => {
  return `<b><h1>${data.branch?.name}</h1>Hello world? ${data.redirectURL}</b>`;
};

module.exports = welcomeTemplate;
