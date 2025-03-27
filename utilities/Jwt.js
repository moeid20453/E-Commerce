const jwt = require('jsonwebtoken');
const oneDay = 1000 * 60 * 60 * 24;

// Create JWT token with user payload
const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d' // Token expires in 1 day
  });
};

// Verify JWT token and return decoded payload
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });
    return {
      valid: true,
      decoded
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
};

// Attach JWT token to response cookies
const attachCookiesToResponse = (res, user) => {
  // Create token with user info
  const token = createJWT({ 
    userId: user._id,
    role: user.role,
    name: user.name
  });

  // Set secure cookie options
  res.cookie('token', token, {
    httpOnly: true, // Prevents JavaScript access
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    signed: true, // Signs the cookie
    expires: new Date(Date.now() + oneDay),
    sameSite: 'strict' // CSRF protection
  });
};

module.exports = {
  createJWT,
  verifyToken, 
  attachCookiesToResponse,
};