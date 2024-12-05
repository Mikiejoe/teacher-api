import { validationResult } from "express-validator";
import {Lesson } from "../models/lesson.model.js";
import {Subject} from "../models/subjects.model.js";
import {Topic,SubTopic } from "../models/topics.model.js";



export const CreateLesson =  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => ({
            field: error.param,
            message: error.msg,
        }));
        return res.status(400).json({errors: errorMessages});
    }
    const {name,description} = req.body;
    try{
        let lesson = new Lesson({
            name,
            description
        });
        lesson = await lesson.save();
        if(!lesson){
            return res.status(400).json({type: "error", message: "Lesson not created"});
        }
        res.status(201).json({type: "success", message: "Lesson created successfully",lesson});
    }catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}
export const CreateSubject =  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => ({
            field: error.param,
            message: error.msg,
        }));
        return res.status(400).json({errors: errorMessages});
    }
    const {name,lessonId} = req.body;
    try{
        const lesson = await Lesson.findById(lessonId);
        if(!lesson){
            return res.status(404).json({type: "error", message: "Lesson not found"});
        }
        let subject = new Subject({
            name,
            lesson: lesson._id
        });
        subject = await subject.save();
        if(!subject){
            return res.status(400).json({type: "error", message: "Subject not created"});
        }
        res.status(201).json({type: "success", message: "Subject created successfully",subject});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}

export const CreateTopic =  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => ({
            field: error.param,
            message: error.msg,
        }));
        return res.status(400).json({errors: errorMessages});
    }
    const {name,description,subjectId} = req.body;
    try{
        const subject = await Subject.findById(subjectId);
        if(!subject){
            return res.status(404).json({type: "error", message: `Subject with ${subjectId} not found`});
        }
        let topic = Topic({
            name,
            description,
            subject: subject._id
        });
        topic = await topic.save();
        if(!topic){
            return res.status(400).json({type: "error", message: "Topic not created"});
        }
        res.status(201).json({type: "success", message: "Topic created successfully",topic});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}


export const CreateSubTopic =  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => ({
            field: error.param,
            message: error.msg,
        }));
        return res.status(400).json({errors: errorMessages});
    }
    const {name,topicId,description} = req.body;
    try{
        const topic = await Topic.findById(topicId);
        if(!topic){
            return res.status(404).json({type: "error", message: `Topic with ${topicId} not found`});
        }
        let subTopic = SubTopic({
            name,
            topic: topic._id,
            description
        });
        subTopic = await subTopic.save();
        if(!subTopic){
            return res.status(400).json({type: "error", message: "SubTopic not created"});
        }
        res.status(201).json({type: "success", message: "SubTopic created successfully",subTopic});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}

export const getLessons =  async (req, res) => {
    try{
        const lessons = await Lesson.find();
        if(!lessons){
            return res.status(404).json({type: "error", message: "No lessons found"});
        }
        res.status(200).json({type: "success", lessons});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}

export const getAllSubjects =  async (req, res) => {
    try{
        const subjects = await Subject.find();
        if(!subjects){
            return res.status(404).json({type: "error", message: "No subjects found"});
        }
        res.status(200).json({type: "success", subjects});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}

export const getSubjects =  async (req, res) => {
    let {lessonId} = req.params;
    lessonId = lessonId.trim();
    try{
        const subjects = await Subject.find().byLesson(lessonId);
        if(!subjects){
            return res.status(404).json({type: "error", message: "No subjects found"});
        }
        res.status(200).json({type: "success", subjects});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}
export const getAllTopics =  async (req, res) => {
    try{
        const topics = await Topic.find();
        if(!topics){
            return res.status(404).json({type: "error",topics:[], message: "No topics found"});
        }
        res.status(200).json({type: "success", topics});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}
export const getTopics =  async (req, res) => {
    let {subjectId} = req.params;
    subjectId = subjectId.trim();
    try{
        const topics = await Topic.find().bySubject(subjectId);
        if(!topics){
            return res.status(404).json({type: "error",topics:[], message: "No topics found"});
        }
        res.status(200).json({type: "success", topics});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}
export const getAllSubTopics =  async (req, res) => {
    try{
        const subTopics = await SubTopic.find();
        if(!subTopics){
            return res.status(404).json({type: "error",subTopics:[], message: "No subTopics found"});
        }
        res.status(200).json({type: "success", subTopics});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}
export const getSubTopics =  async (req, res) => {
    let {topicId} = req.params;
    topicId = topicId.trim();
    try{
        const subTopics = await SubTopic.find().byTopic(topicId);
        if(!subTopics){
            return res.status(404).json({type: "error",subTopics:[], message: "No subTopics found"});
        }
        res.status(200).json({type: "success", subTopics});
    }
    catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
}

