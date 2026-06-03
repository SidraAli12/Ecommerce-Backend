const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {

      
      token = req.headers.authorization.split(' ')[1];

      console.log("TOKEN:", token);

      
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("DECODED:", decoded);

    
      req.user = await User.findById(decoded.id).select('-password');

      console.log("USER:", req.user);

      return next();

    } catch (error) {
      console.log(error);

      return res.status(401).json({
        message: 'Not authorized'
      });
    }
  }

  return res.status(401).json({
    message: 'No token'
  });
};

module.exports = protect;