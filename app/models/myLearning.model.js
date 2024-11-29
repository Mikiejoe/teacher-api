import { Schema,model } from "mongoose";

const myLearningSchema = new Schema({
    learner: { type: Schema.Types.ObjectId, ref: "Learner" },
    subTopic: { type: Schema.Types.ObjectId, ref: "SubTopic" },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: {
                basicAnswer: { type: String, required: true },
                detailedAnswer: { type: String, required: true },
            },
        },
    ],
});

export const MyLearning = model("MyLearning", myLearningSchema);

