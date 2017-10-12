const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const utils = require('../utils');
const User = require('../models/user');
const Task = require('../models/task');
const authService = require('../services/auth');
const emailService = require('../services/email');

router.post('/authenticate', utils.requireParams('email', 'refreshToken'), (req, res) => {

});

router.post('/login', utils.requireParams('email', 'password'), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const auth = await (user ? user.comparePassword(password) : false);

    if (!auth) {
      throw new Error('Invalid email/password combination');
    }

    const [ accessToken, refreshToken ] = await authService.createTokens(user);

    return res.json(utils.createAPIResponse(true, {
      email,
      accessToken,
      refreshToken
    }));
  } catch (error) {
    const { message } = error;

    if (message === 'Invalid email/password combination') {
      return res.json(utils.createAPIResponse(false, message, 401));
    }

    return res.json(utils.createAPIResponse(false, 'Unexpected server error', 500));
  }
});

router.post('/register', utils.requireParams('email', 'password'), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    await emailService.sendVerification(email);

    return res.json(utils.createAPIResponse(true, {
      success: true
    }));
  } catch (error) {
    const { message } = error;

    if (message.includes('duplicate')) {
      await emailService.sendNotification(email);

      return res.json(utils.createAPIResponse(true, {
        success: true
      }));
    }

    if (message.includes('validation')) {
      return res.json(utils.createAPIResponse(false, 'Invalid email provided', 422));
    }

    return res.json(utils.createAPIResponse(false, 'Unexpected server error', 500));
  }
});

router.post('/request-verification', (req, res) => {

});

router.post('/verification', (req, res) => {

});

router.post('/request-reset-password', (req, res) => {

});

router.post('/reset-password', (req, res) => {

});

router.post('/update-password', (req, res) => {

});

module.exports = router;