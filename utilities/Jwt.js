const jwt = require('jsonwebtoken');
const oneDay = 1000 * 60 * 60 * 24;


const createJWT = (payload) => {
  return token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256'
  });
  
};


const verifyToken = ( token ) => {
  return jwt.verify(token, process.env.JWT_SECRET, {algorithms: 'HS256'});
}

const attachCookiesToResponse = ( res, id ) => {
  const token = createJWT(id);

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });
};

module.exports = {
  createJWT,
  verifyToken,
  attachCookiesToResponse,
};