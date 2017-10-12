const jwt = require('jsonwebtoken');

const constants = require('../config/constants');

module.exports = {
  createTokens: async ({ id, email, password }) => {
    const signAccessToken = jwt.sign({
      id,
      email
    }, constants.ACCESS_SECRET, {
      expiresIn: '5m'
    });

    const signRefreshToken = jwt.sign({
      id,
      email
    }, `${constants.REFRESH_SECRET}${password}`, {
      expiresIn: '7d'
    });

    return Promise.all([ signAccessToken, signRefreshToken ]);
  }
};