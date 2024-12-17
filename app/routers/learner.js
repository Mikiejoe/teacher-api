import express from "express";
import { body } from "express-validator";
import { getLearner, createLearner, getLearners } from "../controllers/learner.controller.js";
import { createMyLearning, myLearning, myLearnings,updateMyLearning,getLearningBySubTopic,getSubtopicsLearned } from "../controllers/myLearning.controller.js";

const validateLearner = [
  body("email").isEmail().withMessage("Invalid email"),
  body("uid").isString().withMessage("Invalid uid"),
];

const validateLearning = [
  body("uid").isString().withMessage("Invalid uid").exists().withMessage("uid is required"),
  body("subTopicId").exists().withMessage("subTopicId is required").isMongoId().withMessage("Invalid subTopicId"),
];

const validateUpdate = [
  body("uid").exists().withMessage("uid is required"),
  body("learningId").exists().withMessage("learningId is required").isMongoId().withMessage("learning id is invalid"),
  // body("uid").isEmpty().withMessage("uid is required"),
]
const validateSubtopic = [
  body("uid").exists().withMessage("uid is required"),
  body("subTopicId").exists().withMessage("subTopicId is required").isMongoId().withMessage("subTopicId is invalid"),
]
const validateUpdateLearning = [
  body("uid").exists().withMessage("uid is required"),
  body("learningId").exists().withMessage("learningId is required").isMongoId().withMessage("learning id is invalid"),
  body("state").exists().withMessage("state is required").isString().withMessage("Invalid state"),
]

const learnerRouter = express.Router();

/**
 * @swagger
 * /learner:
 *   post:
 *     summary: Create a learner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Learner's email
 *                 example: example@example.com
 *               uid:
 *                 type: string
 *                 description: Learner's unique identifier
 *                 example: learner123
 *     responses:
 *       201:
 *         description: Learner created successfully
 *       400:
 *         description: Invalid input
 */
learnerRouter.post("/learner", validateLearner, createLearner);

/**
 * @swagger
 * /learner/{id}:
 *   get:
 *     summary: Get a learner by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Learner ID
 *     responses:
 *       200:
 *         description: Learner retrieved successfully
 *       404:
 *         description: Learner not found
 */
learnerRouter.get("/learner/:id", getLearner);
learnerRouter.get("/learner", getLearners);

/**
 * @swagger
 * /myLearning:
 *   post:
 *     summary: Create a new learning
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *                 description: User's unique identifier
 *                 example: user123
 *               subTopicId:
 *                 type: string
 *                 description: Sub-topic ID
 *                 example: 60b8d2958e620e1a13ebc4f9
 *     responses:
 *       201:
 *         description: Learning created successfully
 *       400:
 *         description: Invalid input
 */
learnerRouter.post("/myLearning",validateLearning, createMyLearning);


learnerRouter.get("/myLearning",validateUpdate, myLearning);
learnerRouter.get("/myLearning/history",validateSubtopic, getLearningBySubTopic);


learnerRouter.patch("/myLearning/update",validateUpdateLearning,updateMyLearning)
/**
 * @swagger
 * /myLearning/{uid}:
 *   get:
 *     summary: Get learnings by user ID
 *     
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User's unique identifier
 *     responses:
 *       200:
 *         description: User's learnings retrieved successfully
 *       404:
 *         description: No learnings found for the user
 */
learnerRouter.get("/myLearning/subtopics",getSubtopicsLearned)
learnerRouter.get("/myLearning/:uid", myLearnings);


/**
 * @swagger
 * /myLearning:
 *   get:
 *     summary: Get all learnings
 *     responses:
 *       200:
 *         description: List of all learnings
 *       400:
 *         description: Invalid input
 *       404:
 *         description: No learnings found
 */



export default learnerRouter;
