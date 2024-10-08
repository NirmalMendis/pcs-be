exports.DEVELOPMENT_ENV = 'development';
exports.PRODUCTION_ENV = 'production';
exports.GENERIC_PROD_ERROR = 'Something went wrong...!';
exports.ERROR = 'error';
exports.SUCCESS = 'success';

exports.PASSWORD_RESET_ATTEMPT_LIMIT = 5;

exports.METADATA_TYPES = {
  PAWN_TICKETS_STATUS: 'PAWN_TICKETS_STATUS',
  INVOICE_PDF_SETTINGS: 'INVOICE_PDF_SETTINGS',
  APP_FEATURES: 'APP_FEATURES',
};

exports.MATERIAL_CONTENT_TYPES = {
  HTML: 'HTML',
  PDF: 'PDF',
};

/**
 * @enum {string}
 * @readonly
 */
exports.FunctionEnum = {
  PAWN_TICKET: 'PAWN_TICKET',
  CUSTOMER: 'CUSTOMER',
  IAM: 'IAM',
};

exports.SUPER_ADMIN_ROLE = 'Super Admin';
exports.SOFTTANK_ADMIN_USER_EMAIL = 'dev.softanktech@gmail.com';
exports.DD_MM_YYY_FORMAT = 'dd-MM-yyyy';
exports.TIME_ZONE = 'Asia/Colombo';

exports.DB_ERRORS = {
  SequelizeUniqueConstraintError: 'SequelizeUniqueConstraintError',
};

exports.ItemDetailMeta = {
  caratage: {
    label: 'Caratage',
    unit: 'K',
  },
  weight: {
    label: 'Weight',
    unit: 'g',
  },
  vehicleNo: {
    label: 'Vehicle No',
    unit: '',
  },
};
