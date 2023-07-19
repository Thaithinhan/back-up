const express = require('express');
const { validationResult } = require('express-validator');

//Sử dụng validate manually
const validate = (validation) => {
  return async (req, res, next) => {
    await validation.run(req);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(400).json({ errors: errors.mapped() });
    }
  };
};

module.exports = { validate };
