import express from "express"
import {body}  from "express-validator"
import {login,signup} from "../controllers/auth.controller.js";



const validateUser =[
    body("username").trim().isLength({min:3}).withMessage("Username must be atleast 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long").isStrongPassword().withMessage("Password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character"),
]

export const authRouter = express.Router();

authRouter.post("/signup",validateUser,signup );

authRouter.post("/login", login);

