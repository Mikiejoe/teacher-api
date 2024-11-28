import { Subject,SubTopic,Learner,Topic,MyLearning } from "../models";
import { genQuiz } from "../utils";

export const createMyLearning = async (req, res) => {
    
    const {uid,subTopicId} = req.body;
    try{
        const learner = await Learner.findOne({uid});
        if(!learner){
            return res.status(404).json({type: "error", message: "Learner not found"});
        }
        const subTopic = await SubTopic.findById(subTopicId);
        if(!subTopic){
            return res.status(404).json({type: "error", message: "Subtopic not found"});
        }
        const quizes = await genQuiz(subTopic.name);
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
