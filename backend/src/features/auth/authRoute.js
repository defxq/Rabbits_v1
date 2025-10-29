import express from "express";
const router = express.Router();
import registerController from "./registerController.js";
import logoutController from "./logoutController.js";
import refreshController from "./refreshController.js";
import loginController from "./loginController.js";

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.get('/refresh', refreshController);

export default router;