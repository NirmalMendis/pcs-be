/**
 * @enum {string}
 * @readonly
 */
exports.PawnTicketStatusEnum = {
  ACTIVE: 'Active',
  DUE: 'Due',
  RECOVERED: 'Recovered',
  FORFEITED: 'Forfeited',
  REVISED: 'Revised',
};

/**
 * @enum {string}
 * @readonly
 */
exports.SettingEnum = {
  INVOICE_PDF_MARGIN: 'INVOICE_PDF_MARGIN',
  INVOICE_PDF_SIZE: 'INVOICE_PDF_SIZE',
  COMPANY_NAME: 'COMPANY_NAME',
};

/**
 * @enum {string}
 * @readonly
 */
exports.FeatureEnum = {
  PAWN_TICKET: 'PAWN_TICKET',
  MULTIPLE_BRANCHES: 'MULTIPLE_BRANCHES',
  MULTIPLE_ITEM_TYPES: 'MULTIPLE_ITEM_TYPES',
  IAM: 'IAM',
};

/**
 * @enum {string}
 * @readonly
 */
exports.InterestStatusEnum = {
  UPCOMING: 'Upcoming',
  DUE: 'Due',
  PAID: 'Paid',
  OVERDUE: 'Overdue',
};

/**
 * @enum {string}
 * @readonly
 */
exports.ItemTypesEnum = {
  GENERIC: 'GENERIC',
  GOLD: 'GOLD',
  VEHICLE: 'VEHICLE',
};

/**
 * @enum {string}
 * @readonly
 */
exports.PaymentTypesEnum = {
  INTEREST: 'INTEREST',
  PRINCIPAL: 'PRINCIPAL',
};
