import { Schema,model } from "mongoose";

const topicSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: Schema.Types.ObjectId, ref: "Subject" },
});

topicSchema.query.bySubject = function(subjectId){
    return this.where({subject: subjectId})
}

const subTopicSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    topic: { type: Schema.Types.ObjectId, ref: "Topic" },
});

subTopicSchema.query.byTopic = function(topicId){
    return this.where({topic: topicId})
}


export const Topic = model("Topic", topicSchema);
export const SubTopic = model("SubTopic", subTopicSchema);

