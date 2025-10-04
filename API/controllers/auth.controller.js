import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req?.body || {};

  // Validation
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required", "REQUIRED_FIELDS"));
  }

  try {
    // Check if user already exists
    const isExists = await User.findOne({ email });
    if (isExists) {
      return next(
        errorHandler(409, "Email already exists", "ALREADY_EXISTS_ACCOUNT")
      );
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      code: "SIGNUP_SUCCESS",
      message: "Signup successfully",
    });
  } catch (error) {
    next(error);
  }
};
