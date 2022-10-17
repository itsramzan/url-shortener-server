// Import essential modules
import { check, validationResult } from "express-validator";

// Import user model
import User from "../../models/userModel.js";

// Login validation middleware
export const loginValidation = [
  check("email", "Email required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email address is not valid")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject("No account found");
        }
      } catch (err) {
        return Promise.reject(err.message);
      }
    }),
  check("password", "Password required")
    .not()
    .isEmpty()
    .isStrongPassword()
    .withMessage("Wrong password"),
];

// Handle login validation middleware
export const handleLoginValidation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.entries(mappedErrors).length === 0) {
      next();
    } else {
      res.status(400).json({ errors: mappedErrors });
    }
  } catch (err) {
    next(err);
  }
};
