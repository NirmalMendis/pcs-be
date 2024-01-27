const paginate = require('jw-paginate');

/**
 * @typedef {Object} PagerType
 * @property {number} totalItems
 * @property {number} currentPage
 * @property {number} pageSize
 * @property {number} totalPages
 * @property {number} startPage
 * @property {number} endPage
 * @property {number} startIndex
 * @property {number} endIndex
 * @property {Array<number>} pages
 */

/**
 *
 * @param {number} requestedPage
 * @param {number} requestedPageSize
 * @param {Array} data
 *  @returns {{ pager: PagerType, pageData: Array }}
 */
const paginateData = (requestedPage, requestedPageSize, data) => {
  const page = parseInt(requestedPage) || 1;
  const pageSize = parseInt(requestedPageSize) || 25;
  const pager = paginate(data.length, page, pageSize);
  const pageData = data.slice(pager.startIndex, pager.endIndex + 1);

  return { pager, pageData };
};

module.exports = paginateData;
