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

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);