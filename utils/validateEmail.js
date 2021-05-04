const validateEmail = (email) => {
  //use the epression to check if the email field contains an @, just to verify email
  const expression = /\S+@\S+/;
  return expression.test(String(email).toLowerCase());
};

module.exports = validateEmail