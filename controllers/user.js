const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const validateEmail = require("../utils/validateEmail");
const User = require("../models/user");

//user registration route
const register = async (req, res) => {
  const { firstName, surName, email, occupation, password } = req.body;

  //validate if payloads are empty and return an error
  if (!firstName || !surName || !email || !occupation || !password) {
    return res.status(400).json({
      message: "All fields are required",
      status: "failed",
      data: null,
    });
  }

  //check if email field is valid
  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "Email field is not valid",
      status: "failed",
      data: null,
    });
  }

  //validate password field
  if (password.length < 5) {
    return res.status(400).json({
      message: "Password must be more than 4 characters",
      status: "failed",
      data: null,
    });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exist", status: "failed", data: null });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      surName,
      email,
      occupation,
      password: hashPassword,
    });

    if (user) {
      res.status(201).json({
        status: "success",
        data: {
          _id: user._id,
          firstName: user.firstName,
          surName: user.surName,
          email: user.email,
          occupation: user.occupation,
          token: generateToken(user._id),
        },
      });
    } else {
      res
        .status(400)
        .json({ message: "Invalid user data", status: "failed", data: null });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//user login route
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Invalid email or password",
      status: "failed",
      data: null,
    });
  }

  //check if email field is valid
  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "Email field is not valid",
      status: "failed",
      data: null,
    });
  }

  //validate password field
  if (password.length < 5) {
    return res.status(400).json({
      message: "Password must be more than 4 characters",
      status: "failed",
      data: null,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ error: "Invalid Credentials!" });
      throw new Error("Invalid Credentials!");
    }

    return res.status(200).json({
      status: "success",
      data: {
        _id: user._id,
        firstName: user.firstName,
        surName: user.surName,
        email: user.email,
        occupation: user.occupation,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//get all users route
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json({
      message: "Get all users",
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { register, login, getAllUsers };
