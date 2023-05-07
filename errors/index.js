const UnauthenticatedError = require('./UnAuthenticated');
const CustomAPIError = require('./Custom.Error');
const NotFoundError = require('./Not.Found');
const BadRequestError = require('./Bad.Request');
const UnauthorizedError = require('./UnAuthorized');
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
};