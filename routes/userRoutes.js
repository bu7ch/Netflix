const { addUser, login, getUsers } = require("../controllers/userController");
const auth = require("../middlewares/auth");

const userRouter = require("express").Router();

userRouter.post("/register", addUser);
userRouter.post("/login", login);
userRouter.get("/all", auth, getUsers);

module.exports = userRouter;
