const { verifyToken } = require('../utilities');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return({error: "Token unavailable"});
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    return({error: "Unexpected Error"});
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return({error: "Unexpected Error"});
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};