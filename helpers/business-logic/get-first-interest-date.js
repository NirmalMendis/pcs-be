const { addMonths } = require('date-fns');

/**
 *
 * @param {Date} pawnDate
 *  @returns {Date}
 */
const getFirstInterestDate = (pawnDate) => {
  return addMonths(pawnDate, 1);
};

module.exports = getFirstInterestDate;
