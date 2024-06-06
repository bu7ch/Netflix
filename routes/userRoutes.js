const { addUser, login } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/register", addUser);
userRouter.post('/login', login)

module.exports = userRouter;
