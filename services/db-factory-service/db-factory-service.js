const { Model } = require('sequelize');
const sendSuccessResponse = require('../../helpers/shared/successResponse');
const catchAsync = require('../../utils/catchAsync');
const { AssociationOptionsType } = require('../../utils/types');
const paginateData = require('../../helpers/shared/pagination');
const sequelize = require('../../utils/database');

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
  getOne: (Model, associationOptions = {}) =>
    catchAsync(async (req, res) => {
      let results = [];
      results = await Model.scope(req.query.scope).findByPk(
        req.params.id,
        associationOptions,
      );
      sendSuccessResponse(res, results);
    }),

  /**
   *
   * @param {Model} Model
   * @param {AssociationOptionsType} associationOptions
   * @returns
   */
  getAll: (Model, associationOptions = {}) =>
    catchAsync(async (req, res) => {
      let results = [];
      results = await Model.scope(req.query.scope).findAll(associationOptions);
      if (req.query.page && req.query.pageSize) {
        const { pager, pageData } = paginateData(
          req.query.page,
          req.query.pageSize,
          results,
        );
        if (+pager.totalPages < +req.query.page) {
          sendSuccessResponse(res, []);
        } else {
          sendSuccessResponse(res, pageData, null, pager);
        }
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
    catchAsync(async (req, res) => {
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
    catchAsync(async (req, res) => {
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
        throw error;
      }
    }),

  /**
   *
   * @param {Model} Model
   * @returns
   */
  deleteOne: (Model) =>
    catchAsync(async (req, res) => {
      const transaction = await sequelize.transaction();
      try {
        const doc = await Model.destroy(
          {
            where: {
              id: req.params.id,
            },
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
        throw error;
      }
    }),
};

module.exports = DbFactoryService;
