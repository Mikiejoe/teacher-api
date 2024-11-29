import express from "express";
import {
  lessonValidator,
  subjectValidator,
  topicValidator,
  subTopicValidator,
} from "../validators/lesson.validators.js";
import {
  CreateLesson,
  CreateSubTopic,
  CreateTopic,
  CreateSubject,
  getLessons,
  getSubjects,
  getSubTopics,
  getTopics,
  getAllSubjects,
  getAllTopics,
  getAllSubTopics,
} from "../controllers/lessons.controller.js";

const lessonRouter = express.Router();

lessonRouter.post("/lessons/", lessonValidator, CreateLesson);
lessonRouter.get("/lessons/", getLessons);

lessonRouter.post("/subjects/", subjectValidator, CreateSubject);
lessonRouter.get("/subjects/", getAllSubjects);
lessonRouter.get("/subjects/:lessonId", getSubjects);

lessonRouter.post("/topics/", topicValidator, CreateTopic);
lessonRouter.get("/topics/", getAllTopics);
lessonRouter.get("/topics/:subjectId", getTopics);

lessonRouter.post("/subtopics/", subTopicValidator, CreateSubTopic);
lessonRouter.get("/subtopics/", getAllSubTopics);
lessonRouter.get("/subtopics/:topicId", getSubTopics);

export default lessonRouter;
