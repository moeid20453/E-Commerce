const { verifyToken } = require('../utilities');
const CustomError = require('../errors');

const authenticateUser = async (req, res, next) => {
  let token;
  
  // Check for token in signed cookies
  if (req.signedCookies.token) {
    token = req.signedCookies.token;
  }

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid - No token provided');
  }

  try {
    const { valid, decoded } = verifyToken(token);

    if (!valid) {
      throw new CustomError.UnauthenticatedError('Authentication invalid - Token verification failed');
    }

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      name: decoded.name,
      role: decoded.role
    };

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new CustomError.UnauthorizedError(
      'This route requires admin access'
    );
  }
  next();
};

// Middleware to check if user is regular user
const isUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    throw new CustomError.UnauthorizedError(
      'This route requires user access'
    );
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizeRoles,
  isAdmin,
  isUser
};