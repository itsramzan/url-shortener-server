// Import essential modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Import User model
import User from "../models/userModel.js";

// Register user
export const register = async (req, res, next) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 5);
    const finalData = { ...data, password: hashedPassword };

    const newUser = new User(finalData);
    const user = await newUser.save();

    const { _id, username, email } = user || {};
    const payload = { _id, username, email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

    res.status(201).json({
      message: "Registration successfull!",
      token,
      payload,
    });
  } catch (err) {
    next(err);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password);

      if (comparePassword) {
        const { _id, username, email } = user || {};
        const payload = { _id, username, email };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        });

        res
          .status(200)
          .json({ message: "Authentication successfull", token, payload });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    next(err);
  }
};
