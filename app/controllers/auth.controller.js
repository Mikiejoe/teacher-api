import { hashSync,compareSync } from "bcrypt";
import pkg from 'jsonwebtoken';
import { validationResult } from "express-validator";
import { User} from "../models/user.model.js";

const {sign,} = pkg;


export const signup = async (req, res) => {
  const data = req.body;
  console.log(data);
  const errors = validationResult(req);
  console.log("sdfg");
  console.log(errors);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));
    return res.status(400).json({ errors: errorMessages });
  }
  try {
    let user = new User({
      ...req.body,
      password: hashSync(req.body.password, 10),
    });
    console.log(user);
    user = await user.save();
    if (!user) {
      return res
        .status(400)
        .json({ type: "error", message: "User not created" });
    }
    res
      .status(201)
      .json({ type: "success", message: "User created successfully" });
  } catch (error) {
    if (
      error.message.includes("duplicate key error") &&
      error.message.includes("email")
    ) {
      return res
        .status(400)
        .json({
          type: "error",
          message: "User with that email already exists",
        });
      // console.log("User with that email already exists")
    }
    if (
      error.message.includes("duplicate key error") &&
      error.message.includes("username")
    ) {
      return res
        .status(400)
        .json({
          type: "error",
          message: "User with that username already exists",
        });
      // console.log("User with that email already exists")
    }
    res.status(500).json({ type: "error", message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ type: "error", message: "User not found" });
    }
    if (!compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ type: "error", message: "Invalid password" });
    }

    const accessToken = sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    console.log(accessToken);
    const refreshToken = sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    const token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    await new Token({ userId: user._id, accessToken, refreshToken }).save();
    user.password = undefined;
    return res
      .status(200)
      .json({
        type: "success",
        message: "Login successful",
        ...user._doc,
        accessToken,
      });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ type: "error", message: error.message });
  }
};
// exports.forgotPassword = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(400).send;
//   }
// };
// exports.verifyOTP = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(400).send;
//   }
// };
// exports.changePassword = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(400).send;
//   }
// };
// exports.resetPassword = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(400).send;
//   }
// };