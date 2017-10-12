const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address'],
    required: 'An email address is required'
  },
  password: {
    type: String
  },
  verified: {
    type: Boolean
  },
  verificationToken: {
    type: String
  },
  resetExpires: {
    type: Date
  },
  resetToken: {
    type: String
  },
  tasks: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Task'
  }]
});

module.exports = mongoose.model('User', userSchema);