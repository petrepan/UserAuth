const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  let token;
  //check header for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //verify secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Please login", status: "failed", data: null });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login", status: "failed", data: null });
  }
};

module.exports = auth;
