import {MyLearning} from '../models/myLearning.model.js';
import {Learner} from '../models/learner.model.js';
import {SubTopic} from '../models/topics.model.js';
import {generateQuizQuestions} from "../utils/gemini.js";
import { validationResult } from "express-validator";




export const createMyLearning = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        }));
        return res.status(400).json({errors: errorMessages});
    }
    const {uid,subTopicId} = req.body;
    try{
        const learner = await Learner.findOne({uid});
        if(!learner){
            return res.status(404).json({type: "error", message: "Learner not found"});
        }
        console.log(subTopicId);
        const subTopic = await SubTopic.findById(subTopicId);
        if(!subTopic){
            return res.status(404).json({type: "error", message: "Subtopic not found"});
        }
        const quizes = await generateQuizQuestions(subTopic.name);

        let myLearning = new MyLearning({
            learner: learner._id,
            subTopic: subTopic._id,
            questions: quizes
        });
        myLearning = await myLearning.save();
        if(!myLearning){
            return res.status(400).json({type: "error", message: "MyLearning not created"});
        }
        res.status(201).json({type: "success", message: "MyLearning created successfully",myLearning});
    }catch(error){
        res.status(500).json({type: "error", message: error.message});
    }

}

export const myLearnings = async (req, res) => {
    const {uid} = req.params;
    try{
        const learner = await Learner.findOne({uid});
        if(!learner){
            return res.status(404).json({type: "error", message: "Learner not found"});
        }
        const myLearnings = await MyLearning.find({learner: learner._id});
        if(!myLearnings){
            return res.status(404).json({type: "error", message: "MyLearning not found"});
        }
        res.status(200).json({type: "success", myLearnings});
    }catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}

export const myLearning = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        }));
        return res.status(400).json({errors: errorMessages});
    }
    const {uid,learningId} = req.body;
    try{
        const learner = await Learner.findOne({uid});
        if(!learner){
            return res.status(404).json({type: "error", message: "Learner not found"});
        }
        console.log(learningId)
        const myLearning = await MyLearning.findById(learningId);
        if(!myLearning){
            return res.status(404).json({type: "error", message: "MyLearning not found"});
        }
        res.status(200).json({type: "success", myLearning});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }


}

export const updateMyLearning = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        }));
        return res.status(400).json({errors: errorMessages});
    }
    const {uid,learningId,state} = req.body;
    try{
        const learner = await Learner.findOne({uid});
        if(!learner){
            return res.status(404).json({type: "error", message: "Learner not found"});
        }
        let myLearning = await MyLearning.findById(learningId);
        if(!myLearning){
            return res.status(404).json({type: "error", message: "MyLearning not found"});
        }
        if(state=="correct"){
            myLearning.passedQuestions = [...myLearning.passedQuestions, myLearning.currentIndex]
        }
        if(state=="failed"){
            myLearning.failedQuestions = [...myLearning.failedQuestions, myLearning.currentIndex]
        }

        myLearning.currentIndex +=1;
        myLearning = await myLearning.save();
        if(!myLearning){
            return res.status(400).json({type: "error", message: "MyLearning not updated"});
        }
        res.status(200).json({type: "success", message: "MyLearning updated successfully",myLearning});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}

export const getLearningBySubTopic = async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        }));
        return res.status(400).json({errors: errorMessages});
    }
    const {uid,subTopicId} = req.body;
    try{
        const learner = await Learner.findOne({uid});
        if(!learner){
            return res.status(404).json({type: "error", message: "Learnersssss not found"});
        }
        const myLearning = await MyLearning.findOne({learner: learner._id,subTopic: subTopicId});
        if(!myLearning){
            return res.status(404).json({type: "error", message: "MyLearning not found"});
        }
        res.status(200).json({type: "success", myLearning});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    } 
   
}