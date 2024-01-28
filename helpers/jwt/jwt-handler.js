const jwt = require('jsonwebtoken');
const sendSuccessResponse = require('../shared/success-response');
const { UserType } = require('../../models/user');
const { Response } = require('express');

/**
 *
 * @param {Pick<UserType, 'firstName' | 'lastName' | 'email'>} user
 * @returns {string}
 */
const generateAccessToken = async (user) => {
  const jwtPayloadData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  return jwt.sign(jwtPayloadData, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

/**
 *
 * @param {Pick<UserType, 'email'>} user
 * @returns {string}
 */
const generateRefreshToken = async (user) => {
  const jwtPayloadData = {
    email: user.email,
  };

  return jwt.sign(jwtPayloadData, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

/**
 *
 * @param {Pick<UserType, 'firstName' | 'lastName' | 'email'>} user
 * @param {Response} res
 */
const sendResponseWithJWT = async (user, res) => {
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  res.cookie('refreshToken', refreshToken, {
    // expires: new Date(
    //   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    // ),
    httpOnly: true,
    //secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    secure: true,
    sameSite: 'none',
  });
  const filteredUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  sendSuccessResponse(res, filteredUser, undefined, accessToken);
};

module.exports = {
  generateAccessToken,
  sendResponseWithJWT,
};
