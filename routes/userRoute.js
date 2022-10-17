// Import essential modules
import express from "express";

// Import from registerValidator
import {
  registerValidation,
  handleRegisterValidation,
} from "../middlewares/user/registerValidator.js";

// Import from loginValidator
import {
  loginValidation,
  handleLoginValidation,
} from "../middlewares/user/loginValidator.js";

// Import from userController
import { register, login } from "../controllers/userController.js";

// Initialize router
const router = express.Router();

// Register user
router.post(
  "/register",
  registerValidation,
  handleRegisterValidation,
  register
);

// Login user
router.post("/login", loginValidation, handleLoginValidation, login);

// Export router
export default router;
