import express from "express";
import {
  changePassword,
  deleteUser,
  logOut,
  signIn,
  signUp,
  softDelete,
  updateUser,
  verifyEmail,
} from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/Validator.js";
import { SignInSchema, SignUpSchema } from "./user.validation.js";
const router = express.Router();

router.post("/signUp", validation(SignUpSchema) , signUp);
router.post("/signIn", validation(SignInSchema), signIn);
router.get('/verify/:token',verifyEmail)
router.patch("/changePassword", auth, changePassword);
router.put("/updateUser", auth, updateUser);
router.delete("/deleteUser", auth, deleteUser);
router.patch("/softDelete", auth, softDelete);
router.patch("/logOut", auth, logOut);

export default router;
