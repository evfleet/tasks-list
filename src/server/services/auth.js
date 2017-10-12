const jwt = require('jsonwebtoken');

const constants = require('../config/constants');
const utils = require('../utils');

module.exports = {
  createTokens: async function({ id, email, password }) {
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
  },

  createAuthResponse: async function(res, user) {
    const [ accessToken, refreshToken ] = await this.createTokens(user);

    res.cookie('refreshToken', refreshToken, { signed: true });

    return res.json(utils.createAPIResponse(true, {
      email: user.email,
      accessToken,
      refreshToken
    }));
  }
};