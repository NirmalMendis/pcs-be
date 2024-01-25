const paginate = require("jw-paginate");

const paginateData = (requestedPage, requestedPageSize, data) => {
  const page = parseInt(requestedPage) || 1;
  const pageSize = parseInt(requestedPageSize) || 25;
  const pager = paginate(data.length, page, pageSize);
  const pageData = data.slice(pager.startIndex, pager.endIndex + 1);

  return { pager, pageData };
};

module.exports = paginateData;
