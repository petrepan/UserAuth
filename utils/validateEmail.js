const validateEmail = (email) => {
  const expression = /\S+@\S+/;
  return expression.test(String(email).toLowerCase());
};

module.exports = validateEmail