const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const constants = require('../config/constants');
const utils = require('../utils');
const User = require('../models/user');
const Task = require('../models/task');
const authService = require('../services/auth');
const emailService = require('../services/email');

router.post('/authenticate', utils.requireParams('email', 'refreshToken'), async (req, res) => {
  const { email, refreshToken } = req.body;
  const cookieToken = req.signedCookies.refreshToken;

  try {
    const user = await User.findOne({ email });

    if (!cookieToken || refreshToken !== cookieToken) {
      throw new Error('Invalid authentication');
    }

    const decoded = await jwt.verify(cookieToken, `${constants.REFRESH_SECRET}${user.password}`);

    if (new Date().getTime() / 1000 > decoded.exp) {
      console.log('expired');
    }

    return authService.createAuthResponse(res, user);
  } catch (error) {
    switch (error.message) {
      case 'jwt malformed':
      case 'Expired token':
      case 'invalid signature':
      case 'Invalid authentication':
        return res.json(utils.createAPIResponse(false, 'Invalid authentication', 401));
      default:
        return res.json(utils.createAPIResponse(false, 'Unexpected server error', 500));
    }
  }
});

router.post('/login', utils.requireParams('email', 'password'), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const auth = await (user ? user.comparePassword(password) : false);

    if (!auth) {
      return res.json(utils.createAPIResponse(false, 'Invalid email/password combination', 401));
    }

    if (!user.verified) {
      return res.json(utils.createAPIResponse(false, 'Email has not been verified', 403));
    }

    return authService.createAuthResponse(res, user);
  } catch (error) {
    return res.json(utils.createAPIResponse(false, 'Unexpected server error', 500));
  }
});

router.post('/register', utils.requireParams('email', 'password'), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    await emailService.sendVerification(email, user.verificationToken);

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

router.post('/request-verification', utils.requireParams('email'), async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && !user.verified) {
      await emailService.sendVerification(email, user.verificationToken);
    }

    return res.json(utils.createAPIResponse(true, {
      success: true
    }));
  } catch (error) {
    return res.json(utils.createAPIResponse(false, 'Unexpected server error', 500));
  }
});

router.post('/verification', utils.requireParams('email', 'verificationToken'), async (req, res) => {
  const { email, verificationToken } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.verificationToken !== verificationToken) {
      return res.json(utils.createAPIResponse(false, 'Invalid verification code', 403));
    }

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    return res.json(utils.createAPIResponse(true, {
      success: true
    }));
  } catch (error) {
    return res.json(utils.createAPIResponse(false, 'Unexpected server error', 500));
  }
});

router.post('/request-reset-password', utils.requireParams('email'), async (req, res) => {
  const { email } = req.body;

  try {
    const currentTime = new Date();
    const user = await User.findOneAndUpdate({ email }, {
      $set: {
        resetExpires: currentTime.setMinutes(currentTime.getMinutes() + 30),
        resetToken: crypto.randomBytes(32).toString('hex')
      }
    }, { new: true });

    if (user) {
      await emailService.sendResetPassword(email, user.resetToken);
    }

    return res.json(utils.createAPIResponse(true, {
      success: true
    }));
  } catch (error) {
    return res.json(utils.createAPIResponse(false, 'Unexpected server error', 500));
  }
});

router.post('/reset-password', utils.requireParams('email', 'password', 'resetToken'), async (req, res) => {
  const { email, password, resetToken } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.resetToken !== resetToken) {
      return res.json(utils.createAPIResponse(false, 'Invalid password reset token', 403));
    }

    if (new Date().getTime() > user.resetExpires) {
      return res.json(utils.createAPIResponse(false, 'Password reset has expired'), 403);
    }

    user.password = password;
    user.resetExpires = null;
    user.resetToken = null;
    await user.save();

    return res.json(utils.createAPIResponse(true, {
      success: true
    }));
  } catch (error) {
    return res.json(utils.createAPIResponse(false, 'Unexpected server error', 500));
  }
});

router.post('/update-password', async (req, res) => {

});

module.exports = router;