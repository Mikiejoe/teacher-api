import { body } from "express-validator";


export const lessonValidator = [
    body("name").trim().isLength({min:3}).withMessage("Name must be atleast 3 characters long"),
    body("description").trim().isLength({min:5}).withMessage("Description must be atleast 5 characters long"),
]

export const subjectValidator = [
    body("name").trim().isLength({min:3}).withMessage("Name must be atleast 3 characters long"),
    body("lessonId").trim().isMongoId().withMessage("Lesson ID must be a valid Mongo ID"),
]

export const topicValidator = [
    body("name").trim().isLength({min:3}).withMessage("Name must be atleast 3 characters long"),
    body("description").trim().isLength({min:5}).withMessage("Description must be atleast 5 characters long"),
    body("subjectId").trim().isMongoId().withMessage("Subject ID must be a valid Mongo ID"),
]
export const subTopicValidator = [
    body("name").trim().isLength({min:3}).withMessage("Name must be atleast 3 characters long"),
    body("description").trim().isLength({min:5}).withMessage("Description must be atleast 5 characters long"),
    body("topicId").trim().isMongoId().withMessage("Topic ID must be a valid Mongo ID"),
]

// export default {lessonValidator,subjectValidator,topicValidator,subTopicValidator};