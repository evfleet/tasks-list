const createAPIResponse = require('../createAPIResponse');

module.exports = (...params) => {
  return (req, res, next) => {
    if (params.map((p) => Object.keys(req.body).includes(p)).includes(false)) {
      return res.json(createAPIResponse(false, 'Invalid parameters', 422));
    }
    next();
  };
};