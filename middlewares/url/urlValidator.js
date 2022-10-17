// Import essential modules
import { check, validationResult } from "express-validator";

// Import user model
import URL from "../../models/urlModel.js";

// URL validation middleware
export const urlValidation = [
  check("uniqueText", "Unique text required")
    .not()
    .isEmpty()
    .isAlphanumeric("en-US", { ignore: "-_" })
    .withMessage("Username only contain alpha numeric character")
    .custom(async (value) => {
      try {
        const result = await URL.findOne({ uniqueText: value });
        if (result) {
          return Promise.reject("Unique text already in used");
        }
      } catch (err) {
        return Promise.reject(err.message);
      }
    }),
  check("fullUrl", "Full URL required")
    .not()
    .isEmpty()
    .isURL()
    .withMessage("Not a valid URL"),
];

// Handle url validation middleware
export const handleUrlValidation = async (req, res, next) => {
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
