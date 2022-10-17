// Import essential modules
import createError from "http-errors";

// notfound middleware
const notFound = async (req, res, next) => {
  try {
    next(createError(404, "Not found"));
  } catch (err) {
    next(err);
  }
};

// Export notFound middleware
export default notFound;
