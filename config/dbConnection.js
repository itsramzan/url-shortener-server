// Import essential modules
import mongoose from "mongoose";

// Database connection function
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(`Database successfully connected!`);
  } catch (err) {
    console.log(err);
  }
};

// Export database connection function
export default dbConnection;
