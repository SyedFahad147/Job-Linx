import express from "express";
import { getUser, login, logout, register } from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthorized, logout);
router.route("/getuser").get(isAuthorized, getUser);

export default router;
