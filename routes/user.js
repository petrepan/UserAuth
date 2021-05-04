const router = require("express").Router();
const { register, login, getAllUsers } = require("../controllers/user");
const auth = require("../middlewares/auth");

//user register route
router.post("/register", register);

//user login route
router.post("/login", login);

//get all users route
// Added auth middleware to make sure only an authenticated user can access this route
router.get("/allusers", auth, getAllUsers);

module.exports = router;
