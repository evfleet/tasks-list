
module.exports = {

  sendNotification: (email) => {
    console.log('send notification to existing user');
  },

  sendVerification: (email, verificationToken) => {
    console.log('send verification', verificationToken);
  },

  sendResetPassword: (email, resetToken) => {
    console.log('reset password', resetToken);
  }
};