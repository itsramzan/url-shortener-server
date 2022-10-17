// Import essential modules
import { config } from "dotenv";
import express from "express";
import cors from "cors";

// Import database connection function
import dbConnection from "./config/dbConnection.js";

// Import essential routes
import userRoute from "./routes/userRoute.js";
import urlRoute from "./routes/urlRoute.js";

// Import notFound & errorHandling middlewares
import notFound from "./middlewares/notFound.js";
import errorHandling from "./middlewares/errorHandling.js";

// Invoke config function
config();

// Establish database connection
dbConnection();

// Initialize app
const app = express();

// Enable cors
app.use(cors());

// Parse request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use essential routes
app.use("/user", userRoute);
app.use("/url", urlRoute);

// Not found & error handling middlewares
app.use(notFound);
app.use(errorHandling);

// Listening to app
app.listen(process.env.PORT, process.env.HOST, (err) => {
  if (!err)
    console.log(
      `Server successfully running at - http://${process.env.HOST}:${process.env.PORT}`
    );
});
