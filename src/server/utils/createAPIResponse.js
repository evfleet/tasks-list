module.exports = (success, payload, code) => {
  if (success) {
    return {
      data: payload
    };
  } else {
    return {
      error: {
        code,
        message: payload
      }
    };
  }
};