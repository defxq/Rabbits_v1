import express from "express";
import { deleteMe, deleteUserById, getAllUsers, getMe, getUserById } from "./usersController.js";
const router = express.Router();
import verifyRoles from "../../middleware/verifyRoles.js";
import ROLES_LIST from "../../configs/rolesList.js";


router.get('/all', verifyRoles([ROLES_LIST.Admin]), getAllUsers);
router.get('/me', verifyRoles([ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin]), getMe);
router.get('/:id', verifyRoles([ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin]), getUserById);
router.get('/me', verifyRoles([ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin]), deleteMe);
router.post('/', verifyRoles([ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin]), deleteUserById);


export default router;