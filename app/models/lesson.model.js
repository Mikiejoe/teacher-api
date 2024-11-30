import { Schema,model } from "mongoose";

const lessonSchema = new Schema({
    name: {
        type: String,
        enum: ['ECDE','Primary', 'Secondary', 'College',"University"],
        required: true,
    },
    description: { type: String, required: true },
});
export const Lesson = model("Lesson", lessonSchema);
