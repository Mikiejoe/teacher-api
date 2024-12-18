import { Schema, model } from "mongoose";

const myLearningSchema = new Schema({
  learner: { type: Schema.Types.ObjectId, ref: "Learner" },
  subTopic: { type: Schema.Types.ObjectId, ref: "SubTopic" },
  currentIndex: { type: Number, required: true, default: 0 },
  
  passedQuestions: [{ type: Number, default: 0 }],
  failedQuestions: [{ type: Number, default: 0 }],
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
},{timestamps: true,});

export const MyLearning = model("MyLearning", myLearningSchema);
