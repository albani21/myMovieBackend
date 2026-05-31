const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");


router.post("/login", userController.login);
router.post("/register", userController.addUser);//create user

router.get("/user", userController.getUserByEmail);//read get user
router.put("/user", userController.updateUsername);//updating username
router.delete("/user", userController.deleteUserByEmail)//delete user
router.get("/ping", (req, res) => res.send("pong"));

module.exports = router