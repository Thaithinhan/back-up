//User register Validator
const { checkSchema } = require('express-validator');
const User = require('../models/schemas/users.schemas');

const registerValidate = checkSchema({
  fullname: {
    notEmpty: true,
    isLength: {
      options: {
        min: 3,
        max: 150,
      },
      errorMessage: 'Fullname must be between 3 and 150 characters',
    },
    trim: true,
  },
  username: {
    notEmpty: true,
    isLength: {
      options: {
        min: 3,
        max: 150,
      },
      errorMessage: 'Username must be between 3 and 150 characters',
    },
    trim: true,
  },
  email: {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Invalid email format',
    },
    trim: true,
  },
  password: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: 'Password must be at least 8 characters long',
    },
    trim: true,
  },
});

//Check eamil exits
const checkExistsEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Check Authorization AccessToken
const jwt = require('jsonwebtoken');
const secret_key = require('../../configs/jwt.configs');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Access token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret_key);
    // console.log('Đã vào đây');
    // console.log('decoded', decoded);
    // Nếu mà token đúng thì next()
    req.userId = decoded.userId; // Lưu thông tin người dùng vào request
    // console.log(1111, req.user);
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
  // jwt.verify(token, secret_key, (err, user) => {
  //   if (err) {
  //     return res.status(403).json({ error: 'Invalid access token' });
  //   }

  //   req.user = user;
};

//Export userMiddleware
module.exports = { registerValidate, checkExistsEmail, authMiddleware };
