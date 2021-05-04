const router = require("express").Router();
const { register, login, getAllUsers } = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/allusers", auth, getAllUsers);

module.exports = router;
