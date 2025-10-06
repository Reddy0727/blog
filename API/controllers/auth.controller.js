import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
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

export const signin = async (req, res, next) => {
  const { email, password } = req?.body || {};

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required", "REQUIRED_FIELDS"));
  }

  try {
    const validateUser = await User.findOne({ email });

    if (!validateUser) {
      return next(errorHandler(404, "Email not found", "USER_NOT_FOUND"));
    }

    const validatePassword = await bcryptjs.compare(
      password,
      validateUser.password
    );

    if (!validatePassword) {
      return next(errorHandler(422, "Wrong password", "WRONG_PASSWORD"));
    }

    const token = jwt.sign(
      { id: validateUser._id, email: validateUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      path: "/",
    });

    res.status(200).json({
      success: true,
      code: "SIGNIN_SUCCESS",
      message: "Signed in successfully",
      data:{
        id:validateUser._id,
        username:validateUser.username,
        email:validateUser.email
      }
    });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      // Existing user -> sign token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      const { password, ...rest } = user._doc;

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // lowercase 'production'
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        success: true,
        code: "SIGNIN_SUCCESS",
        message: "Signed in successfully",
        data: rest,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      const { password, ...rest } = newUser._doc;

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(201).json({
        success: true,
        code: "SIGNUP_SUCCESS",
        message: "Account created & signed in successfully",
        data: rest,
      });
    }
  } catch (error) {
    next(error);
  }
};
