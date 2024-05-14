const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication failed' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token expired or invalid' });
    req.user = decoded;
    next();
  });
};

module.exports = authorize;
