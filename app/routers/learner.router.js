import express from "express";
import { createLearner, getLearner } from "../controllers/learner.controller.js";
import {body} from 'express-validator'
import { get } from "mongoose";

const validateLearner = [
    body("email").isEmail().withMessage("Invalid email"),
    body("uid").isString().withMessage("Invalid uid"),
]

export const learnerRouter = express.Router();

learnerRouter.post("/learner", validateLearner, createLearner);
learnerRouter.get("/learner/:id", getLearner);
