const catchAsync = require('./catchAsync');
const AppError = require('./errors/AppError');
const { GENERIC } = require('./errors/errors');

const validate = (schema) =>
  catchAsync(async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      return next(
        new AppError({ ...GENERIC.MISSING_FIELDS, originalError: err }),
      );
    }
  });

module.exports = validate;
