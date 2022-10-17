// errorHandling middleware
const errorHandling = async (err, req, res, next) => {
  try {
    const errCode = err.status ? err.status : 500;
    const errMessage = err.message ? err.message : "Something went wrong";

    res.status(errCode).json({ message: errMessage });
  } catch (err) {
    next(err);
  }
};

// Export errorHandling middleware
export default errorHandling;
