import { MyLearning } from "../models/myLearning.model.js";
import { Learner } from "../models/learner.model.js";
import { SubTopic } from "../models/topics.model.js";
import { generateQuizQuestions } from "../utils/gemini.js";
import { validationResult } from "express-validator";
import { Subject } from "../models/subjects.model.js";

export const createMyLearning = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));
    return res.status(400).json({ errors: errorMessages });
  }
  const { uid, subTopicId } = req.body;
  try {
    const learner = await Learner.findOne({ uid });
    if (!learner) {
      return res
        .status(404)
        .json({ type: "error", message: "Learner not found" });
    }
    const subTopic = await SubTopic.findById(subTopicId)
      .populate("topic")
    
    if (!subTopic) {
      return res
        .status(404)
        .json({ type: "error", message: "Subtopic not found" });
    }
    const level = await Subject.findById(subTopic.topic.subject).populate("lesson")
      
    const quizes = await generateQuizQuestions(subTopic.name,level.lesson.name,subTopic.description);

    if (quizes.error) {
      return res
        .status(500)
        .json({ type: "error", message: "Error generating quiz questions" });
    }

    let myLearning = new MyLearning({
      learner: learner._id,
      subTopic: subTopic._id,
      questions: quizes.response,
    });
    myLearning = await myLearning.save();
    if (!myLearning) {
      return res
        .status(400)
        .json({ type: "error", message: "MyLearning not created" });
    }
    const myL = {
      _id: myLearning._id,
      learner: myLearning.learner,
      questions: myLearning.questions,
      passedQuestions: myLearning.passedQuestions,
      failedQuestions: myLearning.failedQuestions,
      currentIndex: myLearning.currentIndex,
      "__v": myLearning.__v,
      subTopic: myLearning.subTopic

    }
    const result = {
      type: "success",
      message: "MyLearning created successfully",
      myL,
    };
    res.status(201).json(result);
  } catch (error) {
    console.error("error", error.message);
    res.status(500).json({ type: "error", message: error.message });
  }
};

export const myLearnings = async (req, res) => {
  const { uid } = req.params;
  try {
    const learner = await Learner.findOne({ uid });
    if (!learner) {
      return res
        .status(404)
        .json({ type: "error", message: "Learner not found" });
    }
    const myLearnings = await MyLearning.find({ learner: learner._id });
    if (!myLearnings) {
      return res
        .status(404)
        .json({ type: "error", message: "MyLearning not found" });
    }
    res.status(200).json({ type: "success", myLearnings });
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
};

export const myLearning = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));
    return res.status(400).json({ errors: errorMessages });
  }
  const { uid, learningId } = req.body;
  try {
    const learner = await Learner.findOne({ uid });
    if (!learner) {
      return res
        .status(404)
        .json({ type: "error", message: "Learner not found" });
    }
    console.log(learningId);
    const myLearning = await MyLearning.findById(learningId);
    if (!myLearning) {
      return res
        .status(404)
        .json({ type: "error", message: "MyLearning not found" });
    }
    res.status(200).json({ type: "success", myLearning });
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
};

export const updateMyLearning = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));
    return res.status(400).json({ errors: errorMessages });
  }
  const { uid, learningId, state } = req.body;
  try {
    const learner = await Learner.findOne({ uid });
    if (!learner) {
      return res
        .status(404)
        .json({ type: "error", message: "Learner not found" });
    }
    let myLearning = await MyLearning.findById(learningId);
    if (!myLearning) {
      return res
        .status(404)
        .json({ type: "error", message: "MyLearning not found" });
    }
    if (myLearning.currentIndex < myLearning.questions.length - 1) {
      const failedQuestions = myLearning.failedQuestions;
      const passedQuestions = myLearning.passedQuestions;
      let passedQuiz, failedQuiz;
      if (state == "correct") {
        passedQuiz = [...passedQuestions, myLearning.currentIndex];
      }
      if (state == "failed") {
        failedQuiz = [...failedQuestions, myLearning.currentIndex];
      }

      const currentIndex = myLearning.currentIndex + 1;
      const result = await MyLearning.updateOne(
        { _id: learningId }, // Filter
        {
          $set: {
            currentIndex: currentIndex,
            passedQuestions: passedQuiz,
            failedQuestions: failedQuiz,
          },
        },
        { new: true }
      );
      if (result.modifiedCount === 1) {
        res.status(200).json({
          type: "success",
          message: "MyLearning updated successfully",
        });
      } else {
        res.status(500).json({
          type: "error",
          message: "Failed to update",
        });
      }
    } else {
      res
        .status(400)
        .json({ type: "error", message: "You have reached the last question" });
    }
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
};

export const getLearningBySubTopic = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));
    return res.status(400).json({ errors: errorMessages });
  }
  const { uid, subTopicId } = req.body;
  try {
    const learner = await Learner.findOne({ uid });
    if (!learner) {
      return res
        .status(404)
        .json({ type: "error", message: "Learner not found" });
    }
    const myLearning = await MyLearning.find({
      learner: learner._id,
      subTopic: subTopicId,
    }).sort({ updatedAt: -1 });
    if (!myLearning) {
      return res
        .status(404)
        .json({ type: "error", message: "MyLearning not found" });
    }
    const learnings = myLearning.map((item) => ({
      currentIndex: item.currentIndex,
      passedQuestions: item.passedQuestions,
      failedQuestions: item.failedQuestions,
      passedPercent:
        item.currentIndex === item.questions.length
          ? (item.passedQuestions.length * 100) / item.questions.length
          : null,
      completed:
        item.passedQuestions.length + item.failedQuestions.length === 10,
      title:
        item.questions.length > 0
          ? item.questions[item.currentIndex].question
          : null, // Get the first question
      updatedAt: item.updatedAt,
    }));

    res.status(200).json({ type: "success", learnings });
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
};

export const getSubtopicsLearned = async (req, res) => {
  console.log("hello");
  const { uid } = req.body;
  try {
    console.log(uid);
    const learner = await Learner.findOne({ uid });
    if (!learner) {
      return res
        .status(404)
        .json({ type: "error", message: "Learner not found" });
    }
    const myLearning = await MyLearning.find({
      learner: learner._id,
    }).populate("subTopic");
    if (!myLearning) {
      return res
        .status(400)
        .json({ type: "error", message: "MyLearning not found" });
    }
    const subTopics = [];
    const subIds = new Set(); // Use Set to automatically handle uniqueness

    myLearning.forEach((learning) => {
      const subTopic = learning.subTopic;

      if (subTopic && !subIds.has(subTopic._id.toString())) {
        subTopics.push({
          subtopic: subTopic.name,
          id: subTopic._id,
        });
        subIds.add(subTopic._id.toString());
      }
    });
    res.status(200).json({ type: "success", subTopics });
  } catch (error) {
    res.status(500).json({ type: "error", message: error.message });
  }
};
