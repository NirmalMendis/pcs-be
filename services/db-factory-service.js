const { Model, Sequelize } = require('sequelize');
const sendSuccessResponse = require('../helpers/shared/success-response');
const catchAsync = require('../utils/catchAsync');
const { AssociationOptionsType } = require('../utils/types');
const paginateData = require('../helpers/shared/pagination');
const { sequelize } = require('../utils/database');
const logger = require('../utils/logger');

/**
 * @namespace
 */
const DbFactoryService = {
  /**
   *
   * @param {Model} Model
   * @param {AssociationOptionsType} associationOptions
   * @returns
   */
  getOne: (Model, associationOptions = {}, blockScoping = false) =>
    //next needed for error handling
    // eslint-disable-next-line no-unused-vars
    catchAsync(async (req, res, next) => {
      let results = [];
      const ScopedModel = blockScoping
        ? Model
        : req.query.scope
          ? Model.scope(req.query.scope)
          : Model;
      results = await ScopedModel.findByPk(req.params.id, associationOptions);
      sendSuccessResponse(res, results);
    }),

  /**
   *
   * @param {Model} Model
   * @param {AssociationOptionsType} associationOptions
   * @returns
   */
  getAll: (Model, associationOptions = {}, blockScoping = false) =>
    //next needed for error handling
    // eslint-disable-next-line no-unused-vars
    catchAsync(async (req, res, next) => {
      let results = [];
      const ScopedModel = blockScoping
        ? Model
        : req.query.scope
          ? Model.scope(req.query.scope)
          : Model;

      if (req.query.orderBy && req.query.orderDirection) {
        associationOptions.order = [
          [req.query.orderBy, req.query.orderDirection],
        ];
      }
      results = await ScopedModel.findAll(associationOptions);
      if (req.query.page && req.query.pageSize) {
        const { pager, pageData } = paginateData(
          req.query.page,
          req.query.pageSize,
          results,
        );
        sendSuccessResponse(res, { pageData, pager });
      } else {
        sendSuccessResponse(res, results);
      }
    }),

  /**
   *
   * @param {Model} Model
   * @param {AssociationOptionsType} associationOptions
   * @returns
   */
  getAllBySearch: (Model, associationOptions = {}, blockScoping = false) =>
    //next needed for error handling
    // eslint-disable-next-line no-unused-vars
    catchAsync(async (req, res, next) => {
      //next needed for error handling
      const { value, scope } = req.query;

      const ScopedModel = blockScoping
        ? Model
        : scope
          ? Model.scope(scope)
          : Model;

      if (req.query.orderBy && req.query.orderDirection) {
        associationOptions.order = [
          [req.query.orderBy, req.query.orderDirection],
        ];
      }
      associationOptions.where = Sequelize.literal(
        'MATCH (searchString) AGAINST (:value IN BOOLEAN MODE)',
      );
      if (value)
        associationOptions.replacements = {
          value: value
            .trim()
            .replace(/ +(?= )/g, '')
            .split(' ')
            .map((word) => `+${word}*`)
            .join(' '),
        };
      const results = await ScopedModel.findAll(associationOptions);
      if (req.query.page && req.query.pageSize) {
        const { pager, pageData } = paginateData(
          req.query.page,
          req.query.pageSize,
          results,
        );
        sendSuccessResponse(res, { pageData, pager });
      } else {
        sendSuccessResponse(res, results);
      }
    }),

  /**
   *
   * @param {Model} Model
   * @returns
   */
  createOne: (Model) =>
    //next needed for error handling
    // eslint-disable-next-line no-unused-vars
    catchAsync(async (req, res, next) => {
      const transaction = await sequelize.transaction();
      try {
        const doc = await Model.create(req.body, {
          lock: true,
          transaction,
        });
        await doc.setLastUpdatedBy(req.user, { transaction });

        await transaction.commit();
        sendSuccessResponse(res, doc);
      } catch (error) {
        await transaction.rollback();
        logger.error('createOne', error);
        throw error;
      }
    }),

  /**
   *
   * @param {Model} Model
   * @param {AssociationOptionsType} associationOptions
   * @returns
   */
  updateOne: (Model, associationOptions = {}) =>
    //next needed for error handling
    // eslint-disable-next-line no-unused-vars
    catchAsync(async (req, res, next) => {
      const transaction = await sequelize.transaction();
      try {
        const doc = await Model.findOne(
          { where: { id: req.params.id } },
          {
            transaction,
          },
        );
        await doc.set(req.body, {
          transaction,
        });
        await doc.setLastUpdatedBy(req.user, {
          transaction,
        });
        await doc.save({
          lock: true,
          transaction,
        });
        await transaction.commit();
        const updatedDoc = await Model.findByPk(doc.id, associationOptions);
        sendSuccessResponse(res, updatedDoc);
      } catch (error) {
        await transaction.rollback();
        logger.error('updateOne', error);
        throw error;
      }
    }),

  /**
   *
   * @param {Model} Model
   * @returns
   */
  deleteOne: (Model) =>
    //next needed for error handling
    // eslint-disable-next-line no-unused-vars
    catchAsync(async (req, res, next) => {
      const transaction = await sequelize.transaction();
      try {
        const doc = await Model.destroy(
          {
            where: {
              id: req.params.id,
            },
            individualHooks: true,
          },
          {
            lock: true,
            transaction,
          },
        );

        await transaction.commit();
        sendSuccessResponse(res, doc);
      } catch (error) {
        await transaction.rollback();
        logger.error('deleteOne', error);
        throw error;
      }
    }),
};

module.exports = DbFactoryService;
