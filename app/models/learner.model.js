import { Schema, model } from "mongoose";

const learnerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    uid: { type: String, required: true, unique: true },
});

export const Learner = model("Learner", learnerSchema);