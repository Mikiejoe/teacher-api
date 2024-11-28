import { Learner } from "../models";
import { validationResult } from "express-validator";

export const createLearner = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        }));
        return res.status(400).json({errors: errorMessages});
    }
    try{
        let learner = new Learner({
            ...req.body,
        });
        learner = await learner.save();
        if(!learner){
            return res.status(400).json({type: "error", message: "Learner not created"});
        }
        res.status(201).json({type: "success", message: "Learner created successfully",learner});
    }catch(error){
        if(error.message.includes("duplicate key error") && error.message.includes("email")){
            return res.status(400).json({type: "error", message: "Learner with that email already exists"});
        }
        if(error.message.includes("duplicate key error") && error.message.includes("uid")){
            return res.status(400).json({type: "error", message: "Learner with that uid already exists"});
        }
        res.status(500).json({type: "error", message: error.message});
    }

}

export const getLearner = async (req, res) => {
    const id = req.params.id;
    try{
        const learner = await Learner.findOne({uid: id});
        if(!learner){
            return res.status(404).json({type: "error", message: "Learner not found"});
        }
        res.status(200).json({type: "success", data: learner});
    }catch(error){
        res.status(500).json({type: "error", message: error.message});
    }
    finally{
        console.log("Get learner request completed");
    }
}