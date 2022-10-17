// Import essential modules
import express from "express";

// Import checkAuth middleware
import checkAuth from "../middlewares/checkAuth.js";

// Import from urlValidator
import {
  urlValidation,
  handleUrlValidation,
} from "../middlewares/url/urlValidator.js";

// Import from urlController
import {
  shorten,
  getUrls,
  updateUrl,
  deleteUrl,
  redirect,
} from "../controllers/urlController.js";

// Initialize router
const router = express.Router();

// Shorten url
router.post("/shorten", checkAuth, urlValidation, handleUrlValidation, shorten);

// Get urls
router.get("/", checkAuth, getUrls);

// Update url
router.patch("/:id", checkAuth, urlValidation, handleUrlValidation, updateUrl);

// Delete url
router.delete("/:id", checkAuth, deleteUrl);

// Redirect url
router.get("/:uniqueText", redirect);

// Export router
export default router;
